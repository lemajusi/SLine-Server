"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let userModel;
exports.authHandler = new class authHandler {
    constructor() {
        this.validateSignUp = (req) => {
            if (!req.body) {
                return false;
            }
            return true;
        };
        this.errorsSignUp = (error) => {
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
            if (err === '') {
                err = error;
            }
            return err;
        };
    }
};
