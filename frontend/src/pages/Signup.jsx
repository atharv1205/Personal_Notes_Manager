import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [profilePic, setProfilePic] = useState(null);
    const handleFileChange = (e) => {
        setProfilePic(e.target.files[0]);
    };
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("password", formData.password);
            if (profilePic) data.append("image", profilePic);
            const response = await axios.post('http://localhost:3000/api/users/', data, { headers: {
                "Content-Type": "multipart/form-data",
            } });
            if(response.data){
                alert('Signup Successfully! Please login!')
                navigate('/login');
            }
        } catch(err){
            console.log(err);
            alert('Signup Failed, Please try again!');
        }
    };

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Signup</h2>
                <input type="text" name="name" onChange={handleChange} placeholder="Name" required />
                <br />
                <input type="email" name="email" onChange={handleChange} placeholder="Email" required />
                <br />
                <input type="password" name="password" onChange={handleChange} placeholder="Password" required />
                <br />
                <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
                <br />
                <button>Let's Begin</button>
            </form>
        </div>
    )
}

export default Signup;