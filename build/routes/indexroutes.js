"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRoutes = void 0;
const express_1 = require("express");
const indexController_1 = require("../controllers/indexController");
exports.indexRoutes = new class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', indexController_1.indexController.index);
    }
};
