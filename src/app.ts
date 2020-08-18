import { ProfileRoutes } from './routes/profileRoute';
import { UtilityRoutes } from './routes/utilityRoute';
import express = require('express');
import mongoose = require('mongoose');
import bodyParser = require('body-parser');
import cors = require('cors');
import morgan = require('morgan');
require('dotenv').config();
export class App{
    public app;
    private utilityRoutes;
    private profileRoutes;
    constructor() {
        this.app = express();
        this.setup();
        this.routeSetup();
    }
    private routeSetup(): void{
        this.utilityRoutes = new UtilityRoutes();
        this.utilityRoutes.routes(this.app);
        this.profileRoutes = new ProfileRoutes();
        this.profileRoutes.routes(this.app);
    }
    private setup(): void{
        this.app.use(cors());
        this.app.use(bodyParser.urlencoded({ 
            extended: false 
        }))
        this.app.use(bodyParser.json())
    }
    public async databaseSetup(): Promise<boolean>{
        return await mongoose.connect(process.env.DBI_URL,{
            useUnifiedTopology: true,
            useNewUrlParser: true 
        })
    }
    public async disconnectDatabase(): Promise<boolean>{
        return await mongoose.connection.close()
    }
}