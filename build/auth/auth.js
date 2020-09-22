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
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
const hashing_1 = require("./../services/hashing");
const jwt_1 = require("./../services/jwt");
const authHandler_1 = require("./../handlers/authHandler");
exports.authService = new class AuthService {
    authService(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            try {
                const response = yield database_1.pool.query(`SELECT * FROM users WHERE email='${user.email}'`);
                if (response.rowCount === 1 && response.rows[0]) {
                    let dbPass = response.rows[0].password;
                    let match = yield hashing_1.hashingService.comparePasswords(user.password, dbPass)
                        .then(result => result)
                        .catch(error => error);
                    if (match) {
                        let payload = {
                            "sub": response.rows[0].id,
                            "username": response.rows[0].username,
                            "email": response.rows[0].email,
                            "rol": response.rows[0].rol,
                            "fechaIngreso": response.rows[0].fecharegistro
                        };
                        let token = yield jwt_1.jwtService.createToken(payload).then(result => result);
                        res.send({
                            "status": 200,
                            "statusText": 'Ok',
                            "message": 'Nombre de usuario y contraseña correctos.',
                            "token": token
                        });
                    }
                    else if (!match)
                        throw 'Password no coincide.';
                }
                else if (response.rows.length === 0 && !response.rows[0])
                    throw 'Email y/o password no coinciden.';
            }
            catch (error) {
                res.send({
                    status: 500,
                    statusText: 'Internal error',
                    message: error
                });
            }
            ;
        });
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = req.body;
                yield hashing_1.hashingService.hashPassword(user.password)
                    .then(result => user.password = result)
                    .catch(error => error);
                const response = yield database_1.pool.query(`INSERT INTO users (username, email, password, sexo, fechanac) VALUES ('${user.username}', '${user.email}', '${user.password}', '${user.sexo}', '${user.fechanac}')`);
                if (response.rowCount === 1) {
                    let payload = {
                        "sub": response.rows[0].id,
                        "username": response.rows[0].username,
                        "email": response.rows[0].email,
                        "rol": response.rows[0].rol,
                        "fechaIngreso": response.rows[0].fecharegistro
                    };
                    let token = yield jwt_1.jwtService.createToken(payload).then(result => result);
                    res.send({
                        status: 200,
                        statusMessage: 'Ok',
                        message: 'Usuario creado exitosamente',
                        token: token
                    });
                }
                else if (response.rowCount === 0)
                    throw Error();
            }
            catch (error) {
                let err = authHandler_1.authHandler.errorsChecker(error);
                res.send({
                    status: 403,
                    statusText: 'Internal error',
                    message: err
                });
            }
        });
    }
    checkAuthenticated(req, res, next) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.header);
                if (!req.header('authorization')) {
                    return res.send({
                        "status": 401,
                        "statusText": 'Unauthorized',
                        "message": 'Missing Auth Header'
                    });
                }
                let token = (_a = req.header('authorization')) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
                let payload = yield jwt_1.jwtService.decodeToken(token).then(res => res);
                if (!payload) {
                    return res.send({
                        "status": 401,
                        "statusText": 'Unauthorized',
                        "message": 'No tiene carga util'
                    });
                }
                req.body.userId = payload.sub;
                next();
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
