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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import the Express library for building web server and API in Node.js
//Request and Response represent the HTTP request and response objects that my server handles
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
//create an instance of an Express application. app is now an object that represents my web server
//setting the port
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
//app.get('/'): This sets up a route that listens for GET requests on the root URL path (/)
//(req: Request, res: Response): These are the request (req) and response (res) objects passed to the callback function when a request is received
//req: Request: Represents the incoming HTTP request. Contains data like query parameters, request body, headers, etc.
//res: Response: Represents the outgoing HTTP response. Contains methods to send data back to the client.
// GET /taxis endpoint
app.get('/taxis', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // retrieviing query parameters
        const plate = req.query.plate;
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        // validating page and limit
        if (page <= 0 || limit <= 0) {
            return res.status(400).json({
                message: 'Page or limit is not valid'
            });
        }
        // calculating the offset for pagination
        const skip = (page - 1) * limit;
        // querying the db using Prisma
        const taxis = yield prisma.taxis.findMany({
            where: plate ? { plate: { contains: plate } } : {}, // filtering by plate if it's provided
            skip, // used for pagination
            take: limit, // used for pagination
        });
        // returning the list of taxis
        return res.status(200).json({
            messge: 'successful operation',
            data: taxis
        });
    }
    catch (error) { // added for better handleing if there's an error
        console.error('Failed retrieving taxis', error);
        return res.status(500).json({
            message: 'Internal server error'
        });
    }
}));
exports.default = app;
