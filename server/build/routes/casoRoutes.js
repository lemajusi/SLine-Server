"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class CasoRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/');
    }
}
const casoRoutes = new CasoRoutes();
exports.default = casoRoutes.router;
