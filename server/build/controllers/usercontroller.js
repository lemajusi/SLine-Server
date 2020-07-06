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
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield database_1.default.query('SELECT * FROM usuario');
                res.send({
                    status: 200,
                    statusText: 'Request Successful',
                    data: response.rows
                });
            }
            catch (error) {
                res.json({ message: "Not users found." });
                console.log(error);
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield database_1.default.query("select * from usuario where id = '" + req.params.dato + "'");
            if (response.rows == null) {
                res.json("no existe ese usuario");
            }
            else {
                res.json(response.rows);
            }
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
                    if (error.constraint == "usuario_username_key") {
                        res.json({ message: "Este nombre de usuario esta siendo utilizado" });
                    }
                    if (error.constraint == "usuario_email_key") {
                        res.json({ message: "esta direccion de email esta siendo utilizada" });
                    }
                    if (error.column == undefined) {
                        res.json({ massage: "mal ingreso de columna" });
                    }
                    else {
                        res.json("algun tipo de error desconocido");
                        console.log(error);
                    }
                }
            }
        });
    }
    ActualizarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default.query("select * from usuario where username = '" + req.params.dato + "'");
            const a = result.rows;
            console.log(result.rows);
            if (req.body.username == undefined) {
                res.json("username indefinido");
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
            if (a[0] == null) {
                res.json("no existe ese usuario");
            }
            else {
                try {
                    const result = yield database_1.default.query("update usuario set username='" + req.body.username +
                        "', email='" + req.body.email +
                        "', password='" + req.body.password +
                        "', sexo='" + req.body.sexo +
                        "', fechanac='" + req.body.fechanac + "' where username = '" + req.params.dato + "'");
                    res.json({ massage: "Usuario " + req.body.username + " a sido actualizado!" });
                }
                catch (error) {
                    console.log("Actuaulizar" + error);
                    if (error.column == undefined) {
                        res.json("columna indefinida");
                    }
                    if (error.constraint == "usuario_username_key") {
                        res.json({ message: "Este nombre de usuario esta siendo utilizado" });
                    }
                    if (error.constraint == "usuario_email_key") {
                        res.json({ message: "esta direccion de email esta siendo utilizada" });
                    }
                    else {
                        res.json("algun tipo de error desconocido");
                    }
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
