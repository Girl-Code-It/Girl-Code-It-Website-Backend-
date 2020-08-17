import chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
const mongoose = require('mongoose');
import request = require('supertest');
import {App} from '../../app';
let _app;
describe('Profile Create',()=>{
    before((done)=>{
        _app = new App();
        _app.databaseSetup()
        .then(()=>{
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
    it('Creating a valid Profile', (done)=>{
        const data = {
            "userid": "user1" ,
            "name": "First Last",
            "college": "Personal Data",
            "email": "abc@abc.com",
            "phone": "9999999999", 
            "password": "abcdef", 
        }
        request(_app.app).post('/profile/create')
        .send(data)
        .then(({body})=>{
            const _body = JSON.stringify(body,null,4); 
            const _data = JSON.stringify(data,null,4); 
            assert.exists(body, `body is null, data sent = ${_data}`);
            assert.exists(body.message, `body does not have a message, data = ${_data}, body = ${_body}`);
            assert.exists(body.success, `body does not have success, data = ${_data}, body = ${_body}`);
            assert.exists(body.data, `body does not have created user, data = ${_data}, body = ${_body}`);
            assert.equal(body.success, true, `body does not return true success, data = ${_data}, body = ${_body}`);
            assert.equal(body.message, 'Profile Created', `body does not return correct message, data = ${_data}, body = ${_body}`);
            done();
        })
        .catch(err=>{
            done(err);
        });
    })
    it('Creating an invalid profile with no userid', (done)=>{
        const data = {
            "name": "First Last",
            "college": "Personal Data",
            "email": "abc@abc.com",
            "phone": "9999999999", 
            "password": "abcdef", 
        }
        request(_app.app).post('/profile/create')
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
    it('Creating an invalid profile with no name', (done)=>{
        const data = {
            "userid": "abc",
            "college": "Personal Data",
            "email": "abc@abc.com",
            "phone": "9999999999", 
            "password": "abcdef", 
        }
        request(_app.app).post('/profile/create')
        .send(data)
        .then(({body})=>{
            const _body = JSON.stringify(body,null,4); 
            const _data = JSON.stringify(data,null,4); 
            assert.exists(body, `body is null, data sent = ${_data}`);
            assert.exists(body.message, `body does not have a message, data = ${_data}, body = ${_body}`);
            assert.exists(body.success, `body does not have success, data = ${_data}, body = ${_body}`);
            assert.equal(body.success, false, `body does not return correct success, data = ${_data}, body = ${_body}`);
            assert.equal(body.message, '\"name\" is required', `body does not return correct message, data = ${_data}, body = ${_body}`);
            done();
        })
        .catch(err=>{
            done(err);
        });
    })
    it('Creating an invalid profile with no email', (done)=>{
        const data = {
            "userid": "user1" ,
            "name": "First Last",
            "college": "Personal Data",
            "phone": "9999999999", 
            "password": "abcdef", 
        }
        request(_app.app).post('/profile/create')
        .send(data)
        .then(({body})=>{
            const _body = JSON.stringify(body,null,4); 
            const _data = JSON.stringify(data,null,4); 
            assert.exists(body, `body is null, data sent = ${_data}`);
            assert.exists(body.message, `body does not have a message, data = ${_data}, body = ${_body}`);
            assert.exists(body.success, `body does not have success, data = ${_data}, body = ${_body}`);
            assert.equal(body.success, false, `body does not return correct success, data = ${_data}, body = ${_body}`);
            assert.equal(body.message, '\"email\" is required', `body does not return correct message, data = ${_data}, body = ${_body}`);
            done();
        })
        .catch(err=>{
            done(err);
        });
    })
    it('Creating an invalid profile with no password', (done)=>{
        const data = {
            "userid": "user1" ,
            "name": "First Last",
            "college": "Personal Data",
            "email": "abc@abc.com",
            "phone": "9999999999", 
        }
        request(_app.app).post('/profile/create')
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
    it('Creating an existing profile', (done)=>{
        const data = {
            "userid": "user1" ,
            "name": "First Last",
            "college": "Personal Data",
            "email": "abc@abc.com",
            "phone": "9999999999", 
            "password": "abcdef", 
        }
        request(_app.app).post('/profile/create')
        .send(data)
        .then(({body})=>{
            const _body = JSON.stringify(body,null,4); 
            const _data = JSON.stringify(data,null,4); 
            assert.exists(body, `body is null, data sent = ${_data}`);
            assert.exists(body.message, `body does not have a message, data = ${_data}, body = ${_body}`);
            assert.exists(body.success, `body does not have success, data = ${_data}, body = ${_body}`);
            assert.equal(body.success, false, `body does not return correct success, data = ${_data}, body = ${_body}`);
            assert.equal(body.message, 'User Already Exists', `body does not return correct message, data = ${_data}, body = ${_body}`);
            done();
        })
        .catch(err=>{
            done(err);
        });
    })
});