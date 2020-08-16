import mongoose = require('mongoose');
import User from '../models/user';
import Joi = require('@hapi/joi');
import { create } from 'domain';

export class ProfileController{
    public createUser = (request,response)=>{
        const requestSchema = Joi.object({
            userid: Joi.string().required(),
            name: Joi.string().required(),
            college: Joi.string(),
            email: Joi.string().required(),
            phone: Joi.string(), 
        });
        new Promise(async (resolve,reject)=>{
            const {error} = await requestSchema.validate(request.body)
            if(error)reject(error);
            else resolve();
        })
        .then(()=>{
            return User.find({
                $or: [
                    {
                        userid: request.userid
                    },
                    {
                        email: request.email
                    },
                    {
                        phone: request.phone
                    },
                ]
            })
        })
        .then(result => {
            if(result.length !== 0){
                throw new Error("User Already Exists");
            }
            const newUser = new User(request.body);
            return newUser.save();
        })
        .then(createdId => {
            response.setHeader('content-type', 'application/json');
            return response.status(200).send({
                data: createdId,
                success: true,
                message: 'Profile Created'
            });
        })
        .catch(err=>{
            response.setHeader('content-type', 'application/json');
            response.status(500).send({
                message : err.message,
                success: false,
                status : "err"
            })
        })
    }
}