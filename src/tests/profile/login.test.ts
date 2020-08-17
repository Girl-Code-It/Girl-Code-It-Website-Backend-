import chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const mongoose = require('mongoose');
import request = require('supertest');
import {App} from '../../app';
let _app;
describe('Login',()=>{
    const demoProfile = {
        "userid": "user1" ,
        "name": "First Last",
        "college": "Personal Data",
        "email": "abc@abc.com",
        "phone": "9999999999", 
        "password": "abcdef", 
    }
    before((done)=>{
        _app = new App();
        _app.databaseSetup()
        .then(()=>{
            return request(_app.app)
                    .post('/profile/create')
                    .send(demoProfile)
        })  
        .then(({body})=>{
            assert.exists(body);
            assert.exists(body.success);
            assert.equal(body.success,true,'Profile Could not be creating in Login Testing');
            done();
        })      
        .catch(err=>{
            console.log(err);
            done(err);
        })
    })
    after((done)=>{
        _app.disconnectDatabase()
        .then(async ()=>{
            const connection = mongoose.createConnection(process.env.DBI_URL,{
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
            await connection.dropDatabase();
        })
        .then(()=>done())
        .catch(err=>done(err));
    })
    it('Testing a valid login', (done)=>{
        const data = {
            "userid": demoProfile.userid ,
            "password": demoProfile.password, 
        }
        request(_app.app).post('/profile/login')
        .send(data)
        .then(({body})=>{
            const _body = JSON.stringify(body,null,4); 
            const _data = JSON.stringify(data,null,4); 
            assert.exists(body, `body is null, data sent = ${_data}`);
            assert.exists(body.message, `body does not have a message, data = ${_data}, body = ${_body}`);
            assert.exists(body.success, `body does not have success, data = ${_data}, body = ${_body}`);
            assert.exists(body.jwt, `body does not have JWT Token, data = ${_data}, body = ${_body}`);
            assert.equal(body.success, true, `body does not return correct success, data = ${_data}, body = ${_body}`);
            assert.equal(body.message, 'Login Successful', `body does not return correct message, data = ${_data}, body = ${_body}`);
            done();
        })
        .catch(err=>{
            done(err);
        });
    })
    it('Testing a login with wrong password', (done)=>{
        const data = {
            "userid": demoProfile.userid ,
            "password": "qwertyuiop", 
        }
        request(_app.app).post('/profile/login')
        .send(data)
        .then(({body})=>{
            const _body = JSON.stringify(body,null,4); 
            const _data = JSON.stringify(data,null,4); 
            assert.exists(body, `body is null, data sent = ${_data}`);
            assert.exists(body.message, `body does not have a message, data = ${_data}, body = ${_body}`);
            assert.exists(body.success, `body does not have success, data = ${_data}, body = ${_body}`);
            assert.equal(body.success, false, `body does not return correct success, data = ${_data}, body = ${_body}`);
            assert.equal(body.message, 'Password Incorrect', `body does not return correct message, data = ${_data}, body = ${_body}`);
            done();
        })
        .catch(err=>{
            done(err);
        });
    })
    it('Testing a login with no password', (done)=>{
        const data = {
            "userid": demoProfile.userid ,
        }
        request(_app.app).post('/profile/login')
        .send(data)
        .then(({body})=>{
            const _body = JSON.stringify(body,null,4); 
            const _data = JSON.stringify(data,null,4); 
            assert.exists(body, `body is null, data sent = ${_data}`);
            assert.exists(body.message, `body does not have a message, data = ${_data}, body = ${_body}`);
            assert.exists(body.success, `body does not have success, data = ${_data}, body = ${_body}`);
            assert.equal(body.success, false, `body does not return correct success, data = ${_data}, body = ${_body}`);
            assert.equal(body.message, '\"password\" is required', `body does not return correct message, data = ${_data}, body = ${_body}`);
            done();
        })
        .catch(err=>{
            done(err);
        });
    })
    it('Testing a login with no userid', (done)=>{
        const data = {
            "password": "qwertyuiop", 
        }
        request(_app.app).post('/profile/login')
        .send(data)
        .then(({body})=>{
            const _body = JSON.stringify(body,null,4); 
            const _data = JSON.stringify(data,null,4); 
            assert.exists(body, `body is null, data sent = ${_data}`);
            assert.exists(body.message, `body does not have a message, data = ${_data}, body = ${_body}`);
            assert.exists(body.success, `body does not have success, data = ${_data}, body = ${_body}`);
            assert.equal(body.success, false, `body does not return correct success, data = ${_data}, body = ${_body}`);
            assert.equal(body.message, '\"userid\" is required', `body does not return correct message, data = ${_data}, body = ${_body}`);
            done();
        })
        .catch(err=>{
            done(err);
        });
    })
});