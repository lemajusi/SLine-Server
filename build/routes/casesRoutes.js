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
        this.router.get('/', casesController_1.casesController.getCasos);
        //By case id
        this.router.get('/id/:dato', casesController_1.casesController.getCasoById);
        //By user id
        this.router.get('/user/:dato', casesController_1.casesController.getCasoByuserId);
        //Update
        this.router.post('/add', auth_1.authService.checkAuthenticated, casesController_1.casesController.addCaso);
    }
};
