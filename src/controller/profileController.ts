import User from '../models/user';
import Joi = require('@hapi/joi');
import bcrypt = require('bcrypt');
import jwt = require('jsonwebtoken');
export class ProfileController{
    public createUser (request,response): any{
        const requestSchema = Joi.object({
            userid: Joi.string().required(),
            name: Joi.string().required(),
            college: Joi.string(),
            email: Joi.string().required(),
            phone: Joi.string(), 
            password: Joi.string().required()
        });
        (async()=>{
            const {error} = await requestSchema.validate(request.body)
            if(error)throw error;
            const result = await User.find({
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
            if(result.length !== 0){
                throw new Error("User Already Exists");
            }
            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(request.body.password, salt);
            request.body.password = hash;
            const newUser = new User(request.body);
            return await newUser.save();
        })()
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
    
    public login = (request, response)=>{
        const requestSchema = Joi.object({
            userid: Joi.string().required(),
            password: Joi.string().required()
        });
        (async()=>{
            const {error} = await requestSchema.validate(request.body)
            if(error)throw error;
            const user = await User.find({
                userid: request.body.userid
            })
            .populate()
            if(user.length == 0){
                throw new Error("User Does Not Exists");
            }
            if(await bcrypt.compare(request.body.password, user[0].password)){
                const expireTime = process.env.TOKEN_DURATION || '43200'
                return jwt.sign(user[0].toJSON(),
                                process.env.ACCESS_TOKEN_SECRET,
                                {
                                    expiresIn: expireTime
                                })
            }else{
                throw new Error("Password Incorrect");
            }           

        })()
        .then(token=>{
            response.status(200).send({
                success: true,
                message: 'Login Successful',
                jwt: token
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