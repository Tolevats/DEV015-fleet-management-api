"use strict";
//handling the business logic
//here is where I implement the pagination logic, validation, and any other rules, but delegate the actual data fetching to the repository.
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
exports.getTaxis = void 0;
const taxiRepository_1 = require("../repositories/taxiRepository");
const getTaxis = (plate, page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    // Business logic for pagination
    const skip = (page - 1) * limit;
    // Fetch data from the repository
    return (0, taxiRepository_1.findTaxis)(plate, skip, limit);
});
exports.getTaxis = getTaxis;
