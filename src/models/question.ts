import mongoose = require('mongoose');

export interface QuestionInterface{
    name : String,
    link: String,
}


export const QuestionSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    link: {
        type: String,
        require: true
    }
})

const Question = mongoose.model<QuestionInterface>('Question',QuestionSchema);

export default Question;
