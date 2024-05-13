const asyncHandler = require("express-async-handler");
const Note = require("../models/noteModel");
const logger = require("./logger")


const getNotes = asyncHandler(async (req, res) => {
    const note = await Note.find({ user: req.user._id });
    if(note){
        // logger.userLogger.log('info',`Successfully get note`)
        res.send(note).status(200)
    }else{
        // logger.userLogger.log('error','Note Not found')
        res.status(404).json({ message: "Note Not found" })
    }
})

const createNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        res.status(400);
        logger.userLogger.log('error','Please fill up all the field')
        throw new Error("Please fill up all the field")
    } else {
        const note = new Note({ user: req.user._id, title, content, category });
        const createNote = await note.save();
        logger.userLogger.log('info',`Successfully create note of ${req?.body?.title}`)
        res.status(201).json(createNote);
    }
})

const getNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id)

    if (note) {
        // logger.userLogger.log('info',`Successfully get note of ${note.title}`)
        res.json(note)
    } else {
        // logger.userLogger.log('error','Note Not found')
        res.status(404).json({ message: "Note Not found" })
    }
})

const updateNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;
    const note = await Note.findById(req.params.id)

    if (note.user.toString() !== req.user._id.toString()) {
        logger.userLogger.log('error','Note user not matching request user')
        res.status(401);
        throw new Error("We can not perform the action")
    }

    if (note) {
        note.title = title;
        note.content = content;
        note.category = category;

        const updatedNote = await note.save();
        logger.userLogger.log('info',`${note.title} Note updated Successfully `)
        res.json(updatedNote)
    } else {
        logger.userLogger.log('error','Note not found')
        res.status(404).json({ message: "Note Not found" })
    }
})

const deleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
  
    if (note.user.toString() !== req.user._id.toString()) {
    logger.userLogger.log('error','Note user not matching request user')
      res.status(401);
      throw new Error("You can't perform this action");
    }
  
    if (note) {
      await note.deleteOne();
      logger.userLogger.log('info',`${note.title} this Note deleted successfully`)
      res.json({ message: "Note Removed" });
    } else {
      res.status(404);
      logger.userLogger.log('error','Note not found')
      throw new Error("Note not Found");
    }
  });

module.exports = { getNotes, createNote, getNoteById, updateNote, deleteNote };