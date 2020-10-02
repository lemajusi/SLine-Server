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
exports.casesController = void 0;
const database_1 = require("../database");
exports.casesController = new class CasesController {
    addCase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const caseData = req.body;
                const userId = req.body.userId;
                const response = yield database_1.pool.query(`INSERT INTO cases(lat, lng, descripcion, tipoviolencia, idusuario) values (${caseData.lat}, ${caseData.lng},'${caseData.descripcion}', '${caseData.tipoViolencia}', ${userId});`);
                if (response.rowCount === 1) {
                    console.log(response);
                    res.send({
                        status: 200,
                        message: 'Datos del caso ingresados correctamente.',
                    });
                }
                else
                    throw 'Error al ingresar datos del caso en la base de datos.';
            }
            catch (error) {
                console.log(error);
                res.send({
                    status: 403,
                    statusText: 'Internal error',
                    message: error
                });
            }
        });
    }
    getCases(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.userId;
                let response = yield database_1.pool.query(`SELECT id FROM users WHERE id = ${userId}`);
                if (response.rowCount === 1 && response.rows[0].id === userId) {
                    response = yield database_1.pool.query(`SELECT c.*, u.username, u.id FROM cases c INNER JOIN users u ON c.id_usuario = u.id`);
                    if (response.rows) {
                        res.send({
                            status: 200,
                            message: 'Request Successfull',
                            data: response.rows
                        });
                    }
                    else
                        throw 'No hay casos registrados';
                }
                else
                    throw 'No hay concidencia con la id de usuario';
            }
            catch (error) {
                res.send({
                    status: 403,
                    statusText: "Internal error",
                    message: error
                });
            }
        });
    }
    getCasoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query("select * from casos where idcaso = '" + req.params.dato + "'");
                res.send({
                    status: 200,
                    message: 'Request Successfull',
                    data: response.rows
                });
            }
            catch (error) {
                console.log(error);
                res.send({
                    status: 403,
                    statusText: "Error",
                });
            }
        });
    }
    getCasoByuserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.pool.query("select * from casos where idusuario = '" + req.params.dato + "'");
                res.send({
                    status: 200,
                    message: 'Request Successfull',
                    data: response.rows
                });
            }
            catch (error) {
                console.log(error);
                res.send({
                    status: 403,
                    statusText: "Error",
                });
            }
        });
    }
    updateCaso(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const caso = yield database_1.pool.query("select * from casos where id ='" + req.body.id);
        });
    }
};
