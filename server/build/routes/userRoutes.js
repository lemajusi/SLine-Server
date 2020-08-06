"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = __importDefault(require("./../controllers/usercontroller"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Get users
        this.router.get('/', usercontroller_1.default.getUsers);
        // //search by id
        this.router.get('/:dato', usercontroller_1.default.getUserById);
        //Sign Up
        this.router.post('/', usercontroller_1.default.addUser);
        //Login
        this.router.get('/login/:dato', usercontroller_1.default.authService);
        // //borrar
        this.router.delete('/:dato', usercontroller_1.default.deleteUser);
        // //actualizar datos por nombre
        this.router.put('/:dato', usercontroller_1.default.updateUser);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
