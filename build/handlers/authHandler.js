"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authHandler = void 0;
let userModel;
exports.authHandler = new class authHandler {
    constructor() {
<<<<<<< HEAD
        this.validateBody = (userData) => {
            if (!userData) {
                return false;
            }
            if (userData !== userModel) {
=======
        this.validateSignUp = (req) => {
            if (!req.body) {
>>>>>>> master
                return false;
            }
            return true;
        };
<<<<<<< HEAD
        this.errorsChecker = (error) => {
=======
        this.errorsSignUp = (error) => {
>>>>>>> master
            let err = '';
            if (error.constraint === 'users_username_key') {
                err = 'Nombre de usuario ya esta en uso';
            }
            if (error.constraint === 'users_email_key') {
                return 'Correo electronico en uso';
            }
            if (error.code === 'ETIMEDOUT') {
                err = 'Time out';
            }
<<<<<<< HEAD
            if (err === '') {
                err = error;
            }
=======
>>>>>>> master
            return err;
        };
    }
};
