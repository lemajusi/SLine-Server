"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.casesRoutes = void 0;
const express_1 = require("express");
<<<<<<< HEAD
const auth_1 = require("../auth/auth");
=======
>>>>>>> master
const casesController_1 = require("../controllers/casesController");
exports.casesRoutes = new class CasesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
<<<<<<< HEAD
        this.router.get('/', auth_1.authService.checkAuthenticated, casesController_1.casesController.getCases);
=======
        this.router.get('/', casesController_1.casesController.getCasos);
>>>>>>> master
        //By case id
        this.router.get('/id/:dato', casesController_1.casesController.getCasoById);
        //By user id
        this.router.get('/user/:dato', casesController_1.casesController.getCasoByuserId);
        //Update
<<<<<<< HEAD
        this.router.post('/add', auth_1.authService.checkAuthenticated, casesController_1.casesController.addCaso);
=======
        this.router.post('/', casesController_1.casesController.addCaso);
>>>>>>> master
    }
};
