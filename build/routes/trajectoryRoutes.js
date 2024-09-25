"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trajectoryController_1 = require("../controllers/trajectoryController");
const router = (0, express_1.Router)();
//route for fetching trajectories by taxiId and date
router.get('/trajectories', trajectoryController_1.fetchTrajectories);
//route for fetching the latest trajectories
router.get('/trajectories/latest', trajectoryController_1.fetchLatestTrajectories);
exports.default = router;
