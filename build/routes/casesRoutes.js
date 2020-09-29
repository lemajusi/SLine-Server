"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../auth/auth");
const casesController_1 = require("../controllers/casesController");
exports.casesRoutes = new class CasesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        // Get cases
        this.router.get('/', auth_1.authService.checkAuthenticated, casesController_1.casesController.getCases);
        // Get case by id
        this.router.get('/:id', auth_1.authService.checkAuthenticated, casesController_1.casesController.getCaseById);
        //Create
        this.router.post('/add', auth_1.authService.checkAuthenticated, casesController_1.casesController.addCase);
    }
};
