import mongoose = require('mongoose');

export interface VideoInterface{
    name : String,
    link: String,
}


export const VideoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    link: {
        type: String,
        require: true
    }
})

const Video = mongoose.model<VideoInterface>('Video',VideoSchema);

export default Video;
