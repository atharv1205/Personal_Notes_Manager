import Notes from "../model/notesSchema.js";

export const createNote = async (req, res) => {
    console.log("req.user:", req.user);
    const userId = req.user.id;
    const { title, description } = req.body;
    try {
        const newNote = new Notes({ title, description, userId: userId });
        await newNote.save();
        return res.status(201).json(newNote);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
};

export const getNotes = async (req, res) => {
    try {
        const notes = await Notes.find({}).populate("userId", "name");
        if(notes == 0){
            return res.status(404).json({message: "No Notes to display!"});
        }
        return res.status(200).json(notes);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
};

export const getSpecificNote = async (req, res) => {
    try {
        const userId = req.user.id;
        const notes = await  Notes.find({ userId }).populate("userId", "name");
        if(notes == 0){
            return res.status(404).json({message: "No Notes to display!"});
        }
        return res.status(200).json(notes);
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
};

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const existingNote = await Notes.findById(id);
        if(existingNote){
            const updatedNote = await Notes.findByIdAndUpdate(id, req.body, {new:true});
            await updatedNote.save();
            return res.status(201).json(updatedNote);
        }
        return res.status(404).json({message: "Note not found!"});
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
}

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const existingNote = await Notes.findById(id);
        if(existingNote){
            await Notes.findByIdAndDelete(id);
            return res.status(201).json({message: "Note Deleted Successsfully!"});
        }
        return res.status(404).json({message: "Note not found!"});
    } catch(err){
        console.log(err);
        return res.status(500).json(err);
    }
}