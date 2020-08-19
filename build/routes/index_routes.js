"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRoutes = void 0;
const express_1 = require("express");
const indexcontroller_1 = require("../controllers/indexcontroller");
let indexController = new indexcontroller_1.IndexController();
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', indexController.index);
    }
}
;
exports.indexRoutes = new IndexRoutes().router;
