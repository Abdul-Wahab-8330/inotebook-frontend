const express = require('express');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

//Route 1 : get all the notes using GET: "/api/notes/fetchallnotes" login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
})

//Route 2 : Add a new note using POST: "/api/notes/addnote" login required
router.post('/addnote', fetchuser, [
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        //destructuring the request body to get the title, description and tag
        const { title, description, tag } = req.body;
        //if there are errors, return error and message
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        //making a new note
        const notes = new Notes({ title, description, tag, user: req.user.id })
        const savednotes = await notes.save();
        res.json(savednotes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
})

//Route 3 : update note using PUT(using put is good practice for update): "/api/notes/updatenote" login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    try {
        //destructuring the request body to get the title, description and tag
        const { title, description, tag } = req.body;
        //create a newNote object
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        //find the note by id and update it
        let notes = await Notes.findById(req.params.id);
        if (!notes) { return res.status(404).send("Not Found") }
        
        if(notes.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        notes = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote} , {new:true})
        res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
})

//Route 4 : Delete note using DELETE : "/api/notes/deletenote" login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    try {
        //find the note by id and delete it
        let notes = await Notes.findById(req.params.id);
        if (!notes) { return res.status(404).send("Not Found") }
        //Allow deletion only if user owns the notes
        if(notes.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        notes = await Notes.findByIdAndDelete(req.params.id)
        res.json({"Success":"Note has been deleted", notes : notes});
    } catch (error) {
        console.error(error.message);
        res.status(500).send('server error');
    }
})

module.exports = router;