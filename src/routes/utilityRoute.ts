import {UtilityController} from '../controller/utilityController';

export class UtilityRoutes{
    public utilityController;
    constructor(){
        this.utilityController = new UtilityController();
    }
    public routes(app){
        app.route('/utility/').get(this.utilityController.welcome);
    }
}