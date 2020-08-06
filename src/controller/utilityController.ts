import mongoose = require('mongoose');
// import User from '../models/User';
// import Joi = require('@hapi/joi');

export class UtilityController{
    public welcome = (req,res)=>{
        res.status(200).send({
            message: "Hello World",
            success: true
        });
    }
}