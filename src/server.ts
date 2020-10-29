import express, { Application } from "express";
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';

import { v2 as cloudinary } from 'cloudinary';

import { indexRoutes } from './routes/index_routes';
import { userRoutes } from './routes/user_routes';
import { casesRoutes } from './routes/cases_routes';
import { authRoutes } from './routes/auth_routes'


dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

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
        this.app.use('/', indexRoutes.router);
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
