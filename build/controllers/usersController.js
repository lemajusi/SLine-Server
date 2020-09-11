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
exports.userController = void 0;
const database_1 = require("../database");
exports.userController = new class UserController {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.body.userId;
            try {
                let response = yield database_1.pool.query(`SELECT id FROM users WHERE id=${userId}`);
                if (response.rowCount === 1 && response.rows[0].id === userId) {
                    response = yield database_1.pool.query('SELECT username, email, fechanac, fecharegistro, sexo FROM users');
                    if (response.rows.length) {
                        res.send({
                            status: 200,
                            statusText: 'OK',
                            message: 'Request Successfull',
                            data: response.rows
                        });
                    }
                    throw 'No existen usuarios en la base de datos.';
                }
            }
            catch (error) {
                res.send({
                    status: res.status,
                    statusText: res.statusMessage
                });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query("SELECT * FROM users WHERE id = '" + req.params.dato + "'");
                if (response.rows == null) {
                    res.send({
                        status: 403,
                        statusText: "error",
                        message: "This user doesn't exist"
                    });
                }
                else {
                    res.json({
                        status: 200,
                        message: 'Request Successfull',
                        data: response.rows
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.send({
                    status: 404,
                    statusText: "error"
                });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.pool.query("select * from usuario where username = '" + req.params.dato + "'");
            const a = result.rows;
            console.log(result.rows);
            if (a[0] == null) {
                res.send({
                    status: 403,
                    statusText: "Error",
                    message: "This user doesn't exist"
                });
            }
            else {
                try {
                    const result = yield database_1.pool.query("update usuario set username='" + req.body.username +
                        "', email='" + req.body.email +
                        "', password='" + req.body.password +
                        "', sexo='" + req.body.sexo +
                        "', fechanac='" + req.body.fechanac + "' where username = '" + req.params.dato + "'");
                    res.send({
                        status: 200,
                        statusText: "Updated Succesfully"
                    });
                }
                catch (error) {
                    console.log(error);
                    let err = undefined;
                    if (error.constraint == "usuario_username_key") {
                        err = "Usuario duplicado.";
                    }
                    if (error.constraint == "usuario_email_key") {
                        err = "Email duplicado.";
                    }
                    res.send({
                        status: 403,
                        statusText: "Error de Datos",
                        message: err
                    });
                }
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.pool.query("select * from usuario where username = '" + req.params.dato + "'");
            const a = result.rows;
            console.log(result.rows);
            if (a[0] == null) {
                res.sendStatus(403).send({
                    statusText: "No existe este Usuario"
                });
            }
            else {
                try {
                    const result = yield database_1.pool.query("delete from usuario where username = '" + req.params.dato + "'");
                    res.send({
                        status: 200,
                        statusText: "Usuario eliminado"
                    });
                }
                catch (error) {
                    console.log(error);
                    let err = "Error al eliminar Usuario";
                    res.send({
                        status: 403,
                        statusText: err
                    });
                }
            }
        });
    }
};
