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
            navigate('/');
        } catch(err){
            console.log(err);
            alert('Failed to add Note!');
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({...formData, [e.target.name] : e.target.value});
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Add a Note</h2>
                <input type="text" name="title" onChange={handleChange} placeholder="Title" required />
                <br />
                <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
                <br />
                <button>Publish</button>
            </form>
        </div>
    )
}

export default AddNotes;