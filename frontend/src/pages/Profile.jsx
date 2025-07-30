import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: ""
    });
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/users/me', {
                    withCredentials: true
                });
                console.log(res.data);
                setUser(res.data);
                setFormData({
                    name: res.data.name,
                    email: res.data.email
                })
            } catch(err){
                console.log(err);
            }
        }
        fetchUser();
    }, [])

    const handleLogOut = async () => {
        try {
            await axios.post('http://localhost:3000/api/users/logout', {}, {
                withCredentials: true
            });
            alert('Logout Successfully!');
            navigate('/login');
        } catch(err){
            console.log(err);
            alert('Logout Failed');
            navigate('/');
        }
    };

    const handleUpdateClick = () => {
        setShowForm(true);
    };

    const handleFormDataChange = (e) => {
        setFormData({...formData, [e.target.name] : e.target.value})
    }

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:3000/api/users/${user._id}`,  formData, { withCredentials: true });
            console.log(res);
            alert('Updated Profile!');
            window.location.reload();
        } catch(err){
            console.log(err);
            alert('Failed to update Profile');
        }
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${user._id}`, { withCredentials: true });
            console.log('Account Deleted');
            alert('Account Deleted');
            navigate('/signup');
        } catch(err){
            console.log(err);
            alert('Failed to delete Account!');
        }
    }

    return(
        <div>
            <h1>Profile</h1>
            {user.image && (
                <img
                    src={`http://localhost:3000${user.profilePicture}`}
                    alt="Profile"
                    style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }}
                />
            )}
            Name: {user.name}
            <br />
            Email: {user.email}
            <br />
            <button onClick={handleLogOut}>
                Logout
            </button>
            <button onClick={handleUpdateClick}>
                Update
            </button>
            <button onClick={handleDelete}>
                Delete
            </button>

            { showForm && (
                <form onSubmit={handleSubmitUpdate}>
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleFormDataChange} required />
                    <br />
                    <input type="text" name="email" placeholder="Name" value={formData.email} onChange={handleFormDataChange} required />
                    <br />
                    <button type="submit">Update</button>
                </form>
            ) }
        </div>
    )
};

export default Profile;