import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from'helmet';
import compression from 'compression';
import mainRouter from './routes';
//import mainRouter = require('./routes');

class Server {
    expressInstance: any;
    constructor() {
        this.expressInstance = express();
        this.middlewareSetup();
        this.routingSetup();
    }

    middlewareSetup() {

        // Setup requests gZip compression
        this.expressInstance.use(compression());

        // Setup common security protection
        this.expressInstance.use(helmet());

        // Setup Cross Origin access
        this.expressInstance.use(cors());

        // Setup requests format parsing (Only JSON requests will be valid)
        this.expressInstance.use(bodyParser.urlencoded({ extended: true }));
        this.expressInstance.use(bodyParser.json());

    }

    routingSetup() {
          
        this.expressInstance.use('/', mainRouter)
        // Instantiate mainRouter object

        // Add to server routes
        // this.expressInstance.
    }

}

export default Server
