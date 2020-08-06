import mongoose = require('mongoose');

export interface CourseInterface{
    description: String,
    milestones: [mongoose.Types.ObjectId],
}


export const CourseSchema = new mongoose.Schema({
    description: {
        type: String,
        require: true
    },
    milestones: {
        type: [mongoose.Types.ObjectId],
        ref: 'Course'
    }
})

const Course = mongoose.model<CourseInterface>('Course',CourseSchema);

export default Course;
