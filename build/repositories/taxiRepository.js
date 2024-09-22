"use strict";
//focusing purely on the db interactions
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
exports.findTaxis = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// function to fetch taxis from the database
const findTaxis = (plate, skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.taxis.findMany({
        where: plate ? { plate: { contains: plate } } : {},
        skip,
        take: limit,
        select: {
            id: true,
            plate: true,
        },
    });
});
exports.findTaxis = findTaxis;
