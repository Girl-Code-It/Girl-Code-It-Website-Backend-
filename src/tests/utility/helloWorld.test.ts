import chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
import request = require('supertest');
import {App} from '../../app';
const _app = new App();

describe('Hello World', function(){
    before(done=>{
        done()
    })
    after(done=>{
        done();
    })
    it('Checking Hello World End Point',(done)=>{
        request(_app.app).get('/utility/')
        .send()
        .then(({body})=>{
            assert.exists(body);
            assert.exists(body.success, 'success does not exists');
            assert.equal(body.success,true, 'success is not true');
            assert.exists(body.message, 'body do not have message');
            assert.equal(body.message,'Hello World', 'message is incorrect');
            done()
        })
        .catch(err=>done(err));
    })
});