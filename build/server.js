"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const indexRoutes_1 = require("./routes/indexRoutes");
const userRoutes_1 = require("./routes/userRoutes");
const casesRoutes_1 = require("./routes/casesRoutes");
const authRoutes_1 = require("./routes/authRoutes");
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    //rutas de la pagina
    routes() {
        this.app.use('/', indexRoutes_1.indexRoutes.router);
        this.app.use('/users', userRoutes_1.userRoutes.router);
        this.app.use('/cases', casesRoutes_1.casesRoutes.router);
        this.app.use('/auth', authRoutes_1.authRoutes.router);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('SERVER on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
