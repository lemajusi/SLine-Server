"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const casesController_1 = __importDefault(require("../../controllers/casesController"));
class CasesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', casesController_1.default.getCasos);
        //By case id
        this.router.get('/id/:dato', casesController_1.default.getCasoById);
        //By user id
        this.router.get('/user/:dato', casesController_1.default.getCasoByuserId);
        //Update
        this.router.post('/', casesController_1.default.addCaso);
    }
}
exports.CasesRoutes = CasesRoutes;
;
