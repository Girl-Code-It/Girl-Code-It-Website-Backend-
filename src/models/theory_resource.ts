import mongoose = require('mongoose');

export interface TheoryInterface{
    name : String,
    link: String,
}


export const TheorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    link: {
        type: String,
        require: true
    }
})

const Theory = mongoose.model<TheoryInterface>('Theory',TheorySchema);

export default Theory;
