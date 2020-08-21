"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Get users
        this.router.get('/', usersController_1.userController.getUsers);
        //Search by id
        this.router.get('/id/:dato', usersController_1.userController.getUserById);
        //Delete
        this.router.delete('/dlt/:dato', usersController_1.userController.deleteUser);
        //Update
        this.router.put('/update/:dato', usersController_1.userController.updateUser);
    }
}
exports.UserRoutes = UserRoutes;
