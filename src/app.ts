import { UtilityRoutes } from './routes/utilityRoute';
import express = require('express');
import path = require('path');
import bodyParser = require('body-parser');
import cors = require('cors');
import morgan = require('morgan');
require('dotenv').config();

export class App{
    public app;
    private utilityRoutes;
    constructor() {
        this.app = express();
        this.routeSetup();
        this.setup();
    }
    private routeSetup(): void{
        this.utilityRoutes = new UtilityRoutes();
        this.utilityRoutes.routes(this.app);
    }
    private setup(): void{
        this.app.use(cors());
        // this.databaseSetup();
    }
    public databaseSetup():any{
    }
    public disconnectDatabase():any{
    }
}