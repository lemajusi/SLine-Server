"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const casocontroller_1 = __importDefault(require("../controllers/casocontroller"));
class CasesRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', casocontroller_1.default.getCasos);
        //By case id
        this.router.get('/id/:dato', casocontroller_1.default.getCasoById);
        //By user id
        this.router.get('/user/:dato', casocontroller_1.default.getCasoByuserId);
        //Update
        this.router.post('/', casocontroller_1.default.addCaso);
    }
}
;
exports.casesRoutes = new CasesRoutes().router;
