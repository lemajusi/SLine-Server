"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
const hashing_1 = require("./../services/hashing");
const jwt_1 = require("./../services/jwt");
let hashingService = new hashing_1.HashingService();
let jwtService = new jwt_1.JwtService();
class AuthService {
    authService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            try {
                const response = yield database_1.default.query(`SELECT password FROM users WHERE email='${user.email}'`);
                if (response.rowCount === 1 && response.rows[0]) {
                    let dbPass = response.rows[0].password;
                    let match = yield hashingService.comparePasswords(user.password, dbPass).then(result => result);
                    if (match) {
                        let payload = { sub: req.body.id };
                        let token = yield jwtService.createToken(payload).then(result => result);
                        res.send({
                            "status": 200,
                            "statusText": 'Ok',
                            "message": 'The username and password combination is correct!',
                            "token": token
                        });
                    }
                }
                else if (response.rows.length === 0 && !response.rows[0])
                    throw new Error('Email y/o password no coinciden.');
            }
            catch (error) {
                res.send({
                    status: 500,
                    statusText: 'Internal error',
                    message: 'Email y/o password no coinciden.'
                });
            }
            ;
        });
    }
    ;
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let user = req.body;
            try {
                yield hashingService.hashPassword(user.password).then(result => {
                    user.password = result;
                });
                const response = yield database_1.default.query(`INSERT INTO users (username, email, password, sexo, fechanac) VALUES ('${user.username}', '${user.email}', '${user.password}', '${user.sexo}', '${user.fechanac}')`);
                if (response.rowCount === 1) {
                    res.send({
                        status: 200,
                        statusMessage: 'Ok',
                        text: 'User created successfully'
                    });
                }
                else if (response.rowCount === 0)
                    throw Error();
            }
            catch (error) {
                let err = '';
                console.log(error);
                if (error.constraint === 'users_username_key') {
                    err = 'Username is already in use';
                }
                if (error.constraint === 'users_email_key') {
                    err = 'Email is already in use';
                }
                res.send({
                    status: 403,
                    statusText: 'Internal error',
                    message: err
                });
            }
        });
    }
    ;
    checkAuthenticated(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (!req.header('authorization')) {
                return res.send({
                    "status": 401,
                    "statusText": 'Unauthorized',
                    "message": 'Missing Auth Header'
                });
            }
            let token = (_a = req.header('authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            let payload = yield jwtService.decodeToken(token).then(res => res);
            if (!payload) {
                return res.send({
                    "status": 401,
                    "statusText": 'Unauthorized',
                    "message": 'Missing Auth Invalid'
                });
            }
            req.body = payload;
        });
    }
}
exports.AuthService = AuthService;
