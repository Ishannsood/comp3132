const noteModel = require('../models/NotesModel.js');
const express = require('express');
const noteRoutes = express.Router();

// Sends the right HTTP error for a failed database call
const handleError = (err, res, id) => {
    if (err.name === 'ValidationError') {
        return res.status(400).send({ message: err.message });
    }
    // Malformed ObjectId (e.g. /notes/123)
    if (err.name === 'CastError' && err.path === '_id') {
        return res.status(404).send({ message: "Note not found with id " + id });
    }
    return res.status(500).send({ message: err.message || "Some error occurred." });
};

//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
noteRoutes.post('/notes', async (req, res) => {
    // Validate request
    if(!req.body || !req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to save the note
    try {
        const note = new noteModel(req.body.content);
        const data = await note.save();
        res.status(201).send(data);
    } catch (err) {
        handleError(err, res);
    }
});

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
noteRoutes.get('/notes', async (req, res) => {
    // (no request body on a GET, so the content check is not needed here)
    //TODO - Write your code here to returns all note
    try {
        const notes = await noteModel.find();
        res.send(notes);
    } catch (err) {
        handleError(err, res);
    }
});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
noteRoutes.get('/notes/:noteId', async (req, res) => {
    // (no request body on a GET, so the content check is not needed here)
    //TODO - Write your code here to return onlt one note using noteid
    try {
        const note = await noteModel.findById(req.params.noteId);
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    } catch (err) {
        handleError(err, res, req.params.noteId);
    }
});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
noteRoutes.put('/notes/:noteId', async (req, res) => {
    // Validate request
    if(!req.body || !req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    //TODO - Write your code here to update the note using noteid
    try {
        const update = { ...req.body.content };
        if (!update.dateUpdated) {
            update.dateUpdated = Date.now();
        }
        const note = await noteModel.findByIdAndUpdate(req.params.noteId, update, {
            new: true,            // return the updated document
            runValidators: true   // keep schema rules (e.g. priority) on update
        });
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send(note);
    } catch (err) {
        handleError(err, res, req.params.noteId);
    }
});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
noteRoutes.delete('/notes/:noteId', async (req, res) => {
    // (no request body on a DELETE, so the content check is not needed here)
    //TODO - Write your code here to delete the note using noteid
    // Note: findByIdAndRemove was removed in Mongoose 8, findByIdAndDelete replaces it
    try {
        const note = await noteModel.findByIdAndDelete(req.params.noteId);
        if (!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({ message: "Note deleted successfully!" });
    } catch (err) {
        handleError(err, res, req.params.noteId);
    }
});

module.exports = noteRoutes;
