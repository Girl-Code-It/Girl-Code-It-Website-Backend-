import chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
import request = require('supertest');
import {App} from '../../app';
import mongoose from 'mongoose';
let _app
describe('Profile Create',()=>{
    before((done)=>{
        _app = new App();
        mongoose.connect(process.env.DBI_URL,{
            useUnifiedTopology: true,
            useNewUrlParser: true 
        })
        .then(()=>{
            done();
        })        
        .catch(err=>{
            console.log(err);
            done(err);
        })
    })
    after((done)=>{
        mongoose.connection.close()
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
});