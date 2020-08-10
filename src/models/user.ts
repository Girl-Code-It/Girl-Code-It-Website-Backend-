import mongoose = require('mongoose');

export interface UserInterface{
    userid: String,
    name : String,
    college: String,
    courses: [mongoose.Types.ObjectId],
    verified: Boolean,
    admin: Boolean,
    email: String,
    phone: String,
    solved: [mongoose.Types.ObjectId]
}


export const UserSchema = new mongoose.Schema({
    userid: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    college: {
        type: String,
        default: ''
    },
    courses: {
        type: [mongoose.Types.ObjectId],
        ref: 'Course'
    },
    verified: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
    },
    solved: {
        type: [mongoose.Types.ObjectId],
        ref: 'Question'
    },
})

const User = mongoose.model<UserInterface>('User',UserSchema);

export default User;
