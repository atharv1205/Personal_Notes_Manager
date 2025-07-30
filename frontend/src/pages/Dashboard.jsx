import axios from "axios";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";

const Dashboard = () => {
    const [notes, setNotes] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    });
    const [editingNoteId, setEditingNoteId] = useState(null);
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/notes/myNotes', {
                    withCredentials: true,
                });
                setNotes(res.data);
            } catch (err) {
                console.error("Error fetching notes:", err);
            }
        };
        fetchNotes();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3000/api/notes/${id}`, formData, { withCredentials: true });
            alert('Note Updated Successfully!');
            setEditingNoteId(null);
            setNotes(prevNotes =>
                prevNotes.map(note =>
                    note._id === id ? response.data : note
                )
            );
        } catch(err){
            console.error(err);
            alert('Failed to update the Note!');
        }
    }

    const startEditingNote = (note) => {
        setEditingNoteId(note._id);
        setFormData({
            title: note.title,
            description: note.description
        });
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/notes/${id}`, {withCredentials: true});
            setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
            console.log("Note Deleted Successfully!");
            alert('Note Deleted Successfully!');
        } catch(err){
            console.log(err);
            alert("Failed to Delete the Note!");
        }
    }

    return(
        <div>
            <h1>NoteNest</h1>
            {notes.length > 0 ? (
                <div>
                    {notes.map(note => (
                        <div key={note._id}>
                            {editingNoteId === note._id ? (
                                <form onSubmit={(e) => handleSubmit(e, note._id)}>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                    <br />
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                    <br />
                                    <button type="submit">Update</button>
                                    <button type="button" onClick={() => setEditingNoteId(null)}>Cancel</button>
                                </form>
                            ) : (
                                <div>
                                    <h2>{note.title}</h2>
                                    <p>{note.description}</p>
                                    <p>{note.userId ? note.userId.name : "Anonymous - Account Deleted"}</p>
                                    <p>{note.date}</p>
                                    <button onClick={() => startEditingNote(note)}>Edit</button>
                                    <button onClick={() => handleDelete(note._id)}>Delete</button>
                                </div>
                            )}
                        </div>
                    ))}
                    <Link to='/add_note'>Add Note</Link>
                    <br />
                    <Link to='/profile'>Profile</Link>
                </div>
            ) : (
                <div>
                    <p>No notes found or you're not logged in.</p>
                    <Link to='/login'>Login</Link>
                    <br />
                    <Link to='/signup'>Signup</Link>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
