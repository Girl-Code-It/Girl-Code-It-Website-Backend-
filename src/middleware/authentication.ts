import User from '../models/user';
import jwt = require('jsonwebtoken');
import { resolve } from 'path';
export const LocalAuthenticate = (req,res,next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null){
        return res.status(401).send({
            message: "Authorization Token Missing",
            success: false,
            status: "err"
        })
    }
    new Promise((resolve, reject)=>{
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err : any, user: any)=>{
            if(err)return reject(err);
            req.user = user;
            resolve(user);
        })
    })
    .then((user) => {
        next();
    })
    .catch(err =>{
        return res.status(401).send({
            message: "Invalid Authorization Token",
            success: false,
            status: "err"
        })
    })
}