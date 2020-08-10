import mongoose = require('mongoose');

export interface MilestoneInterface{
    name : String,
    duration: String,
    video_resources: [mongoose.Types.ObjectId],
    theory_resources: [mongoose.Types.ObjectId]
    questions: [mongoose.Types.ObjectId]
}


export const MilestoneSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    duration: {
        type: String,
        default: ''
    },
    video_resources: {
        type: [mongoose.Types.ObjectId],
        ref: 'Video'
    },
    theory_resources: {
        type: [mongoose.Types.ObjectId],
        ref: 'Theory'
    },
    questions: {
        type: [mongoose.Types.ObjectId],
        ref: 'Question'
    },
})

const Milestone = mongoose.model<MilestoneInterface>('Milestone',MilestoneSchema);

export default Milestone;
