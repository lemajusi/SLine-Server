"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
const auth_1 = require("./../auth/auth");
exports.userRoutes = new class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Get users
        this.router.get('/', auth_1.authService.checkAuthenticated, usersController_1.userController.getUsers);
        //Search by id
        this.router.get('/id/:dato', usersController_1.userController.getUserById);
        //Delete
        this.router.delete('/dlt/:dato', usersController_1.userController.deleteUser);
        //Update
        this.router.put('/update/:dato', usersController_1.userController.updateUser);
    }
};
