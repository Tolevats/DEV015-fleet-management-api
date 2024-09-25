"use strict";
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
exports.getLatestTrajectories = exports.getTrajectories = void 0;
const trajectoryRepository_1 = require("../repositories/trajectoryRepository");
const getTrajectories = (taxiId, date) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, trajectoryRepository_1.findTrajectoriesByTaxiAndDate)(taxiId, date);
});
exports.getTrajectories = getTrajectories;
//service method to get the latest trajectories
const getLatestTrajectories = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, trajectoryRepository_1.findLatestTrajectories)();
});
exports.getLatestTrajectories = getLatestTrajectories;
