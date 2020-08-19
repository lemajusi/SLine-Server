import express, { Application } from "express";
import morgan from 'morgan';
import cors from 'cors';

import { indexRoutes } from './routes/index_routes';
import { UserRoutes } from './routes/userRoutes';
import { CasesRoutes } from './routes/casesRoutes';
import { AuthRoutes } from './routes/authRoutes'

let userRoutes = new UserRoutes();
let casesRoutes = new CasesRoutes();
let authRoutes = new AuthRoutes()

class Server {
    app: Application;

    constructor(){
        this.app = express()
        this.config()
        this.routes()
    }

    config(): void{
        this.app.set('port', 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: false}));
    }

    //rutas de la pagina
    routes(): void{
        this.app.use('/', indexRoutes);
        this.app.use('/users', userRoutes.router);
        this.app.use('/cases', casesRoutes.router);
        this.app.use('/auth', authRoutes.router);

    }

    start():void{
        this.app.listen(this.app.get('port'), () => {
            console.log('SERVER on port', this.app.get('port'));
        });
    }
}

const server = new Server()
server.start()
