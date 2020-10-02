"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.casesRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../auth/auth");
const cases_controller_1 = require("../controllers/cases_controller");
exports.casesRoutes = new class CasesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', auth_1.authService.checkAuthenticated, cases_controller_1.casesController.getCases);
        //By case id
        this.router.get('/:dato', cases_controller_1.casesController.getCasoById);
        //By user id
        this.router.get('/user/:dato', cases_controller_1.casesController.getCasoByuserId);
        //Create
        this.router.post('/add', auth_1.authService.checkAuthenticated, cases_controller_1.casesController.addCase);
    }
};
