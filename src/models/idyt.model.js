import mongoose from "mongoose";

const idYT = new mongoose.Schema({
    id_yt: {
        type: String,
        unique: true,
        trim: true,
        minlength: 11,
        maxlength: 11,
    },
    option: {
        type: String,
        trim: true,
        default: 'dmca',
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {
    timestamps: true,
})

export default mongoose.model('idYT', idYT);