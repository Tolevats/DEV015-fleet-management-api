"use strict";
//initializing the Express app and attaching the routes
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taxiRoutes_1 = __importDefault(require("./routes/taxiRoutes"));
const trajectoryRoutes_1 = __importDefault(require("./routes/trajectoryRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
//register routes
app.use(taxiRoutes_1.default);
app.use(trajectoryRoutes_1.default);
app.use(userRoutes_1.default);
exports.default = app;
