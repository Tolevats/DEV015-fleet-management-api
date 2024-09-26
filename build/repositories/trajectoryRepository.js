"use strict";
//querying the db for trajectories that match the taxiId and date
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findLatestTrajectories = exports.findTrajectoriesByTaxiAndDate = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const findTrajectoriesByTaxiAndDate = (taxiId, date) => __awaiter(void 0, void 0, void 0, function* () {
    //parse the incoming date string (format DD-MM-YYYY)
    const [day, month, year] = date.split('-').map(Number);
    //checking if the parsed date components are valid
    if (!day || !month || !year || isNaN(day) || isNaN(month) || isNaN(year)) {
        throw new Error('Invalid date format');
    }
    //creating a Date object for the start of the day
    const startOfDay = new Date(year, month - 1, day, 0, 0, 0); // month - 1 because months are 0-indexed | 00:00:00
    //creating a Date object for the end of the day
    const endOfDay = new Date(year, month - 1, day, 23, 59, 59);
    //checking if the created Date objects are valid
    if (isNaN(startOfDay.getTime()) || isNaN(endOfDay.getTime())) {
        throw new Error('Invalid date');
    }
    //querying the db filtering between the start and end of the day
    const trajectories = yield prisma.trajectories.findMany({
        where: {
            taxi_id: parseInt(taxiId),
            date: {
                gte: startOfDay, //gte: greater than or equal to (start of the day)
                lte: endOfDay, //lte: less than or equal to (end of the day)
            },
        },
        select: {
            id: true,
            taxi_id: true,
            date: true,
            latitude: true,
            longitude: true,
        },
    });
    //transforming the `taxi_id` to `taxiId` in the returned data
    const transformedTrajectories = trajectories.map(trajectory => ({
        id: trajectory.id,
        taxiId: trajectory.taxi_id, //map `taxi_id` to `taxiId`
        date: trajectory.date,
        latitude: trajectory.latitude,
        longitude: trajectory.longitude,
    }));
    return transformedTrajectories;
});
exports.findTrajectoriesByTaxiAndDate = findTrajectoriesByTaxiAndDate;
//method to find the latest trajectories
const findLatestTrajectories = () => __awaiter(void 0, void 0, void 0, function* () {
    //group by taxi_id and get the latest date for each taxi
    const latestTrajectories = yield prisma.trajectories.groupBy({
        by: ['taxi_id'],
        _max: {
            date: true,
        },
        orderBy: {
            _max: {
                date: 'desc', //get the latest data based on date
            },
        },
        take: 10, //limit to 10 latest entries
    });
    //fetch full trajectory details for the latest records
    const detailedTrajectories = yield Promise.all(latestTrajectories.map((trajectory) => __awaiter(void 0, void 0, void 0, function* () {
        const detailedTrajectory = yield prisma.trajectories.findFirst({
            where: {
                taxi_id: trajectory.taxi_id,
                date: trajectory._max.date,
            },
            include: {
                taxis: {
                    select: { plate: true }, //only select the taxi plate
                },
            },
        });
        return detailedTrajectory;
    })));
    //transforming the result using built-in methods
    return detailedTrajectories.map((trajectory) => {
        var _a, _b;
        return ({
            taxiId: trajectory.taxi_id, //with non-null assertion
            plate: (_a = trajectory.taxis) === null || _a === void 0 ? void 0 : _a.plate, //with non-null assertion
            timestamp: (_b = trajectory.date) === null || _b === void 0 ? void 0 : _b.toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            }),
            latitude: trajectory.latitude, //with non-null assertion
            longitude: trajectory.longitude, //with non-null assertion
        });
    });
});
exports.findLatestTrajectories = findLatestTrajectories;
