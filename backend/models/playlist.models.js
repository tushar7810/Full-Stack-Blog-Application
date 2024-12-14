import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    blogs : [
        {
            type: Schema.Types.ObjectId,
            ref: "Blog"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

export const Playlist = mongoose.model("Playlist" , playlistSchema)