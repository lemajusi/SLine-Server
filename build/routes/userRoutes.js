"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const auth_1 = require("./../auth/auth");
let userController = new usersController_1.UserController();
let authService = new auth_1.AuthService();
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Get users
        this.router.get('/', authService.checkAuthenticated, userController.getUsers);
        //Search by id
        this.router.get('/id/:dato', userController.getUserById);
        //Delete
        this.router.delete('/dlt/:dato', userController.deleteUser);
        //Update
        this.router.put('/update/:dato', userController.updateUser);
    }
}
exports.UserRoutes = UserRoutes;
