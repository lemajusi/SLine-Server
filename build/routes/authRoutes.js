"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../auth/auth");
let authService = new auth_1.AuthService();
class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Sign Up
        this.router.post('/signup', authService.signUp);
        //Login
        this.router.post('/login', authService.authService);
    }
}
exports.AuthRoutes = AuthRoutes;
