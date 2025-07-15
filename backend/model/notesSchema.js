import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});

const Notes = mongoose.model('Notes', notesSchema);
export default Notes;