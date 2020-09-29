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
exports.casesController = new class CasesController {
    addCase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let caseData = req.body;
                caseData.id_usuario = req.body.userId;
                const response = yield database_1.pool.query(`INSERT INTO cases(lat, lng, descripcion, tipo_violencia, id_usuario) values (${caseData.lat}, ${caseData.lng},'${caseData.descripcion}', '${caseData.tipo_violencia}', ${caseData.id_usuario});`);
                if (response.rowCount === 1) {
                    console.log(response);
                    res.send({
                        status: 201,
                        statusText: 'Created',
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
                    response = yield database_1.pool.query(`SELECT c.id_caso, c.descripcion, to_char(c.fecha_registro, 'DD/MM/YYYY') as fecha_registro, c.verified, c.lat, c.lng, c.tipo_violencia, c.id_usuario, u.username FROM cases c INNER JOIN users u ON c.id_usuario = u.id`);
                    if (response.rows) {
                        res.send({
                            status: 200,
                            message: 'Request Successfully',
                            data: response.rows
                        });
                    }
                    else
                        throw 'No hay casos registrados';
                }
                else
                    throw 'No hay concidencia de usuario';
            }
            catch (error) {
                console.log(error);
                res.send({
                    status: 403,
                    statusText: "Internal error",
                    message: error
                });
            }
        });
    }
    getCaseById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let userId = +req.body.userId;
                let caseId = +req.params.id;
                let response = yield database_1.pool.query(`SELECT c.id_caso, c.descripcion, to_char(c.fecha_registro, 'DD/MM/YYYY') as fecha_registro, c.verified, c.lat, c.lng, c.tipo_violencia, c.id_usuario FROM cases c WHERE c.id_caso=${caseId} AND c.id_usuario=${userId}`);
                if (response.rows[0]) {
                    res.send({
                        status: 200,
                        message: 'Request Successfull',
                        data: response.rows
                    });
                }
                else
                    throw Error();
            }
            catch (error) {
                res.send({
                    status: 403,
                    statusText: "Error",
                    message: error
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
