"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
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
        this.router.get('/id/:dato', user_controller_1.userController.getUserById);
        //Sign Up
        this.router.post('/signup', user_controller_1.userController.signUp);
        //Login
        this.router.post('/login', user_controller_1.userController.authService);
        //Delete
        this.router.delete('/dlt/:dato', user_controller_1.userController.deleteUser);
        //Update
        this.router.put('/update/:dato', user_controller_1.userController.updateUser);
    }
}
exports.userRoutes = new UserRoutes().router;
