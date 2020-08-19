"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
let userController = new usersController_1.UserController();
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Get users
        this.router.get('/', userController.getUsers);
        //Search by id
        this.router.get('/id/:dato', userController.getUserById);
        //Delete
        this.router.delete('/dlt/:dato', userController.deleteUser);
        //Update
        this.router.put('/update/:dato', userController.updateUser);
    }
}
exports.UserRoutes = UserRoutes;
