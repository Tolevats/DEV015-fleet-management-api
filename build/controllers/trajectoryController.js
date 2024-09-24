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
exports.fetchTrajectories = void 0;
const trajectoryService_1 = require("../services/trajectoryService");
const fetchTrajectories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const taxiId = req.query.taxiId;
        const dateStr = req.query.date;
        //check1 for missing taxiId or date parameters
        if (!taxiId || !dateStr) {
            return res.status(400).json({ message: 'Missing required parameters: taxiId or date' });
        }
        //fetch trajectories for the given taxiId and date
        const trajectories = yield (0, trajectoryService_1.getTrajectories)(taxiId, dateStr);
        //return 404 if no trajectories are found
        if (!trajectories || trajectories.length === 0) {
            return res.status(404).json({ message: 'No trajectories found for the specified taxi id and date' });
        }
        //return trajectories with 200 OK
        return res.status(200).json(trajectories);
    }
    catch (error) {
        console.error('Error fetching trajectories:', error.message);
        //check2 if the error is due to an invalid date format
        if (error.message === 'Invalid date format' || error.message === 'Invalid date') {
            return res.status(400).json({ message: 'Invalid date format. Please use DD-MM-YYYY format.' });
        }
        //return 500 for any other server error
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.fetchTrajectories = fetchTrajectories;
