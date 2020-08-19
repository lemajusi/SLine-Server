"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = require("./routes/index_routes");
const userRoutes_1 = require("./routes/userRoutes");
const casesRoutes_1 = require("./routes/casesRoutes");
const authRoutes_1 = require("./routes/authRoutes");
let userRoutes = new userRoutes_1.UserRoutes();
let casesRoutes = new casesRoutes_1.CasesRoutes();
let authRoutes = new authRoutes_1.AuthRoutes();
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
        this.app.use('/', index_routes_1.indexRoutes);
        this.app.use('/users', userRoutes.router);
        this.app.use('/cases', casesRoutes.router);
        this.app.use('/auth', authRoutes.router);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('SERVER on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
