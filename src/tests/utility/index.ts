import chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
import request = require('supertest');
import {App} from '../../app';
const _app = new App();

describe('Utility Test Controller', function(){
    before(done=>{
        done();
    })
    after(done=>{
        done();
    })
    describe('Hello World Test', function() {
        require('./helloWorld.test.js')
    })
});