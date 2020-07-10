"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const casocontroller_1 = __importDefault(require("../controllers/casocontroller"));
class CasoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', casocontroller_1.default.getCasos);
        //casos por id 
        this.router.get('/id/:dato', casocontroller_1.default.getCasoById);
        //casos de usuario Perfil
        this.router.get('/user/:dato', casocontroller_1.default.getCasoByuserId);
        //update caso
        this.router.post('/', casocontroller_1.default.addCaso);
    }
}
const casoRoutes = new CasoRoutes();
exports.default = casoRoutes.router;
