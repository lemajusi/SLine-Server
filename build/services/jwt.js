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
const jwt_simple_1 = __importDefault(require("jwt-simple"));
let secretKey = "Mb18jl5OMdq8gl5Eu6aqd-YgdQu7E1d3-mdg3FFaarPNB40IJgFZgOBUfbd_o9x1";
class JwtService {
    createToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return new Promise(resolve => resolve(jwt_simple_1.default.encode(payload, secretKey)));
            }
            catch (error) {
                console.log(error);
            }
        });
    }
}
exports.JwtService = JwtService;
