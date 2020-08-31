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
exports.jwtService = void 0;
const jwt_simple_1 = __importDefault(require("jwt-simple"));
let secretKey = "MIIDDTCCAfWgAwIBAgIJQPsMoJtBf61BMA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNVBAMTGWRldi1lOG85ODdtaS51cy5hdXRoMC5jb20wHhcNMjAwODExMTkwODIwWhcNMzQwNDIwMTkwODIwWjAkMSIwIAYDVQQDExlkZXYtZThvOTg3bWkudXMuYXV0aDAuY29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArt4Z4CEWBEQ7/78a0TT6stwCCO3I04Ih2v4JvW7Q2tXrHjkw+/+PP3G29+L5qupEdkVF8cn4CZ3igN8/C8WwyXR2F1li2AyKxrZsTSIB0crDgf4CQ5iom+yfQPdLYxrl33VprbLfKgD9Z1OYnMsnLLGT3dPQopzjSpA59Tw32aWT6uSGiTetmsGuqOppy2YXjSQ3hCcNGyof/BF1Vkx6VrgfiYPZlFtEOWTqQboR4cWiopfivi1UDJMoFhoJNtkPKo8Se6YeuKcQzhUVGCHOD5fzfYPZB9W7Umbt72hauBSqc8Uh2mqZi37/DYYZIFVRrycSnTak2K6ztcILO8P+OwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBTytlje7We1TgZXFHv+7XY95Wc1VjAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEBAKlBdEUt5/q/La/cOriVeR6MV2joc+gRSH0beOdamuoYP/ey6bQp1y3ZdBO3fL+7vEWwJFAkpitmiPmR52xwuuH2Ry++1PkxlD9O4XggPHUnPqCdLPNnQiirqf66BkImglf18y/uQY7LSrMsz+B8KSJ844IuIt8GGqXv4+3ARuYJOGUDV5Rb5cyqpTOddnfUNo5L4Iib2kP5ldzjKOpkM9k7idchLi/IE6zfSZU6Rg4wvthpB/CvbkPUITFJsG9sB7Ha2wSkjEnCq0Q9EzWbZ+nolYN8Vhsxt3ZUKTlyX42IOpHDr2gkmdIgU64/0YACSYMgZZ6RPjR+lbcoFWnVao4=";
exports.jwtService = new class JwtService {
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
    decodeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return jwt_simple_1.default.decode(token, secretKey);
            }
            catch (error) {
                console.log(error);
            }
        });
    }
};
