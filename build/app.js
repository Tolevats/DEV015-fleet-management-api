"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//initializing the Express app and attaching the routes
const express_1 = __importDefault(require("express"));
const taxiRoutes_1 = __importDefault(require("./routes/taxiRoutes"));
const trajectoryRoutes_1 = __importDefault(require("./routes/trajectoryRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); //parses incoming request body
//register routes
app.use(taxiRoutes_1.default);
app.use(trajectoryRoutes_1.default);
app.use(userRoutes_1.default);
app.use(authRoutes_1.default);
exports.default = app;
