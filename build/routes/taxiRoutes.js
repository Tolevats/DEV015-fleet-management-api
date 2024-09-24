"use strict";
//setting up the /taxis route and points to the controller that handles the request
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taxiController_1 = require("../controllers/taxiController");
const router = (0, express_1.Router)();
// GET /taxis endpoint
router.get('/taxis', taxiController_1.fetchTaxis);
exports.default = router;
