"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("./../controllers/userController"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //list users
        this.router.get('/', userController_1.default.getUsers);
        //search by id
        this.router.get('/:dato', userController_1.default.getUserById);
        //SignUp
        this.router.post('/signup', userController_1.default.CrearUsuario);
        //borrar
        this.router.delete('/:dato', userController_1.default.BorrarUsuario);
        //actualizar datos por nombre
        this.router.put('/:dato', userController_1.default.ActualizarUsuario);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
