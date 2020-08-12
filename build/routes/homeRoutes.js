"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homecontroller_1 = __importDefault(require("../controllers/homecontroller"));
class HomeRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //metodos que le pasas al server
        this.router.get('/', homecontroller_1.default.HomePage);
    }
}
const homeRoutes = new HomeRoutes();
exports.default = homeRoutes.router;
