import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const AddNotes = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            await axios.post('http://localhost:3000/api/notes', formData, {
                withCredentials: true
            });
            alert('Note Added Successfully!');
            navigate('/dashboard');
        } catch (err) {
            console.log(err);
            alert('Failed to add Note!');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add a Note</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        placeholder="Title"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-500"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 placeholder-gray-500 resize-none"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition duration-200"
                    >
                        Publish
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddNotes;
