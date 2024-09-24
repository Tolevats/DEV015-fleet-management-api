"use strict";
//handling the incoming request and response logic
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
exports.fetchTaxis = void 0;
const taxiService_1 = require("../services/taxiService");
const fetchTaxis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get query parameters
        const plate = req.query.plate;
        const page = parseInt(req.query.page, 10) || 1;
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
        // Validate pagination
        if (isNaN(page) || isNaN(limit) || page <= 0 || limit <= 0) {
            return res.status(400).json({
                message: 'Page or limit is not valid',
            });
        }
        // Call service to get taxis
        const taxis = yield (0, taxiService_1.getTaxis)(plate, page, limit);
        // Send response
        return res.status(200).json(taxis);
    }
    catch (error) {
        console.error('Failed retrieving taxis', error);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
});
exports.fetchTaxis = fetchTaxis;
