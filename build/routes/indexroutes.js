"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRoutes = void 0;
const express_1 = require("express");
const indexcontroller_1 = require("../controllers/indexcontroller");
exports.indexRoutes = new class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', indexcontroller_1.indexController.index);
    }
};
