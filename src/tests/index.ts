import chai = require('chai');
const expect = chai.expect;
const assert = chai.assert;
import request = require('supertest');
import {App} from '../app';
const _app = new App();

describe('Main Test Controller', function(){
    before(done=>{
        done();
    })
    after(done=>{
        done();
    })
    describe('Utility Tests', function() {
        require('./utility')
    })
});