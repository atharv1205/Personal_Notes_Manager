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
    };

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
        } catch (err) {
            console.error(err);
            alert('Failed to update the Note!');
        }
    };

    const startEditingNote = (note) => {
        setEditingNoteId(note._id);
        setFormData({
            title: note.title,
            description: note.description
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/notes/${id}`, { withCredentials: true });
            setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
            alert('Note Deleted Successfully!');
        } catch (err) {
            console.log(err);
            alert("Failed to Delete the Note!");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">📓 Your Notes</h1>

            {notes.length > 0 ? (
                <div className="grid gap-6 max-w-4xl mx-auto">
                    {notes.map(note => (
                        <div
                            key={note._id}
                            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
                        >
                            {editingNoteId === note._id ? (
                                <form onSubmit={(e) => handleSubmit(e, note._id)} className="space-y-4">
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                                    />
                                    <div className="flex gap-4">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                                        >
                                            Update
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditingNoteId(null)}
                                            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="space-y-2">
                                    <h2 className="text-xl font-semibold text-gray-800">{note.title}</h2>
                                    <p className="text-gray-700">{note.description}</p>
                                    <p className="text-sm text-gray-500">
                                        {note.userId ? note.userId.name : "Anonymous - Account Deleted"}
                                    </p>
                                    <p className="text-sm text-gray-400">{note.date}</p>
                                    <div className="flex gap-3 mt-2">
                                        <button
                                            onClick={() => startEditingNote(note)}
                                            className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(note._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="text-center mt-6 space-x-4">
                        <Link to='/add_note' className="text-blue-500 hover:underline font-medium">Add Note</Link>
                        <Link to='/profile' className="text-blue-500 hover:underline font-medium">Profile</Link>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-600 mt-12">
                    <p className="mb-4">No notes found or you're not logged in.</p>
                    <Link to='/add_note' className="text-blue-500 hover:underline font-medium">Add Note</Link>
                    <span className="mx-2">|</span>
                    <Link to='/login' className="text-blue-500 hover:underline font-medium">Login</Link>
                    <span className="mx-2">|</span>
                    <Link to='/signup' className="text-blue-500 hover:underline font-medium">Signup</Link>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
