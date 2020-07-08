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
        //list users
        this.router.get('/', usercontroller_1.default.getUsers);
        //search by id
        this.router.get('/:dato', usercontroller_1.default.getUserById);
        //SignUp
        this.router.post('/', usercontroller_1.default.createUser);
        //borrar
        this.router.delete('/:dato', usercontroller_1.default.BorrarUsuario);
        //actualizar datos por nombre
        this.router.put('/:dato', usercontroller_1.default.ActualizarUsuario);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
