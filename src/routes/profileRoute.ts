import { ProfileController } from './../controller/profileController';

export class ProfileRoutes{
    private profileController;
    constructor(){
        this.profileController = new ProfileController();
    }
    public routes(app){
        app.route('/profile/create').post(this.profileController.createUser);
    }
}