"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_1 = require("../auth/auth");
exports.authRoutes = new class AuthRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Sign Up
        this.router.post('/signup', auth_1.authService.signUp);
        //Login
        this.router.post('/login', auth_1.authService.authService);
    }
};
