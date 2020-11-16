import express, { Application } from "express";
import https from 'https';
var fs = require('fs');

import { indexRoutes } from './routes/index_routes';
import { userRoutes } from './routes/user_routes';
import { casesRoutes } from './routes/cases_routes';
import { authRoutes } from './routes/auth_routes'

var app = express();
var port = 3000;
https.createServer({
    cert: fs.readFileSync('server-cert.pem'),
    key: fs.readFileSync('server-key.pem')
},app).listen(port, function(){
    console.log("conected")
})
app.get('/',indexRoutes.router);
app.get('/users',userRoutes.router);
app.get('/cases',casesRoutes.router);
app.get('/auth',authRoutes.router);
/*class Server {
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
*/

