"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trajectoryController_1 = require("../controllers/trajectoryController");
const router = (0, express_1.Router)();
// Define the GET /trajectories route
router.get('/trajectories', trajectoryController_1.fetchTrajectories);
exports.default = router;
