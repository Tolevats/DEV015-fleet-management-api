"use strict";
// i'm using this file as the entry point that starts the server
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = 3000 || process.env.PORT;
//app.listen(PORT, ...: This tells the Express application to start listening for incoming HTTP requests on the port specified by PORT
//() => { ... }: This is a callback function that gets executed once the server starts successfully
app_1.default.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
