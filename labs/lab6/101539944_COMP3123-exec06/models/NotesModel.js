const mongoose = require('mongoose');

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDUIM)
//      - dateAdded
//      - dateUpdated
const NoteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: [true, 'noteTitle is required'],
        trim: true
    },
    noteDescription: {
        type: String,
        required: [true, 'noteDescription is required'],
        trim: true
    },
    priority: {
        type: String,
        uppercase: true,
        enum: {
            values: ['HIGH', 'MEDIUM', 'LOW'],
            message: 'priority must be HIGH, MEDIUM or LOW'
        },
        default: 'MEDIUM'
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Note', NoteSchema);
