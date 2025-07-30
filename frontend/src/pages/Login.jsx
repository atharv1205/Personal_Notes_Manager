import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormDat] = useState({
        email: "",
        password: ""
    });
    const handleChange = (e) => {
        setFormDat({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', formData, {
                withCredentials: true
            });
            if (response.data) {
                alert("Login successful!");
                navigate('/');
            }
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please check your credentials.");
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required/>
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required/>
                <button>Login</button>
            </form>
        </div>
    )
}

export default Login;