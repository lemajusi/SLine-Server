"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user_controller");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Get users
        this.router.get('/', user_controller_1.userController.getUsers);
        //Search by id
        this.router.get('/:dato', user_controller_1.userController.getUserById);
        //Sign Up
        this.router.post('/', user_controller_1.userController.addUser);
        //Login
        this.router.get('/login/:dato', user_controller_1.userController.authService);
        //Delete
        this.router.delete('/:dato', user_controller_1.userController.deleteUser);
        //Update
        this.router.put('/:dato', user_controller_1.userController.updateUser);
    }
}
exports.userRoutes = new UserRoutes().router;