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
class UserController {
    Lista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query('SELECT * FROM usuario');
            const resultado = result.rows;
            res.json(resultado);
        });
    }
    Usuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const a = req.params.dato;
            console.log(a);
            const result = yield database_1.default.query("select * from usuario where username = '" + a + "'");
            const resultado = result.rows;
            res.json(resultado);
        });
    }
    CrearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const nombre = req.body.username;
            if (req.body.username == undefined) {
                res.json("nombre indefinifo");
            }
            if (req.body.email == undefined) {
                res.json("email indefinido");
            }
            if (req.body.password == undefined) {
                res.json("password indefinido");
            }
            if (req.body.fechanac == undefined) {
                res.json("fecha Nacimiento indefinido");
            }
            if (req.body.sexo == undefined) {
                res.json("sexo indefinido");
            }
            else {
                try {
                    const result = yield database_1.default.query("insert into usuario (username, email, password, fechanac, sexo) values ('" +
                        req.body.username + "','" +
                        req.body.email + "','" +
                        req.body.password + "','" +
                        req.body.fechanac + "','" +
                        req.body.sexo + "')");
                    res.json({ massage: "Usuario " + nombre + " a sido registrado!" });
                }
                catch (error) {
                    console.log("crearUsuario" + error);
                    if (error.constraint == "usuario_username_key") {
                        res.json({ message: "Este nombre de usuario esta siendo utilizado" });
                    }
                    if (error.constraint == "usuario_email_key") {
                        res.json({ message: "esta direccion de email esta siendo utilizada" });
                    }
                    if (error.column == undefined) {
                        res.json({ massage: "mal ingreso de columna" });
                    }
                }
            }
        });
    }
    ActualizarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const a = req.params.dato;
            try {
                const result = yield database_1.default.query("update usuarios set ? where usuario username = ?", [req.body, a]);
                const resultado = result.rows;
                res.json(resultado);
            }
            catch (error) {
                console.log("Actuaulizar" + error);
                if (error.column == undefined) {
                    res.json("columna indefinida");
                }
            }
        });
    }
    BorrarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const a = req.params.dato;
            try {
                const result = yield database_1.default.query("delete from usuario where username = '" + a + "'");
                res.json({ message: "Eliminado" });
            }
            catch (error) {
                console.log(error);
                res.json({ message: "Peticion no aceptada" });
            }
        });
    }
}
const userController = new UserController();
exports.default = userController;
