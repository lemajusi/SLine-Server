"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.indexRoutes = void 0;
const express_1 = require("express");
const indexcontroller_1 = __importDefault(require("../controllers/indexcontroller"));
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.get('/', indexcontroller_1.default.index);
    }
}
;
exports.indexRoutes = new IndexRoutes().router;
