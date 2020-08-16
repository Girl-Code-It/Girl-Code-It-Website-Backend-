import chai = require('chai');

describe('Profile Test Controller',async ()=>{
    before(async (done)=>{
        done();
    })
    after(async (done)=>{
        done();
    })
    describe('Create profile Tests', () => {
        require('./createProfile.test.js');
    })
});