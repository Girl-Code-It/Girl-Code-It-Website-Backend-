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
    public databaseSetup():any{
        return new Promise((resolve,reject)=>{
            mongoose.connect(process.env.DBI_URL,{
                useUnifiedTopology: true,
                useNewUrlParser: true 
            })
            .then(()=>{
                resolve();
            })
            .catch(err=>{
                reject(err);
            })
        })
    }
    public disconnectDatabase():any{
        return new Promise((resolve,reject)=>{
            mongoose.connection.close()
            .then(()=>resolve())
            .catch(err=>reject(err));
        })
    }
}