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
class CasoController {
    getCasos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.default.query("Select * from casos");
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
                    statusText: "error",
                    message: "Can't Get"
                });
            }
        });
    }
    getCasoById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.default.query("select * from casos where id = '" + req.body.idC + "'");
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
}
const casoController = new CasoController();
exports.default = casoController;
