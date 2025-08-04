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
                setUser(res.data);
                setFormData({
                    name: res.data.name,
                    email: res.data.email
                });
            } catch (err) {
                console.log(err);
            }
        };
        fetchUser();
    }, []);

    const handleLogOut = async () => {
        try {
            await axios.post('http://localhost:3000/api/users/logout', {}, {
                withCredentials: true
            });
            alert('Logout Successfully!');
            navigate('/login');
        } catch (err) {
            console.log(err);
            alert('Logout Failed');
            navigate('/');
        }
    };

    const handleUpdateClick = () => {
        setShowForm(true);
    };

    const handleFormDataChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/users/${user._id}`, formData, {
                withCredentials: true
            });
            alert('Updated Profile!');
            window.location.reload();
        } catch (err) {
            console.log(err);
            alert('Failed to update Profile');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${user._id}`, {
                withCredentials: true
            });
            alert('Account Deleted');
            navigate('/signup');
        } catch (err) {
            console.log(err);
            alert('Failed to delete Account!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl font-bold mb-6">Profile</h1>

            {user.profilePicture && (
                <img
                    src={`http://localhost:3000${user.profilePicture}`}
                    alt="Profile"
                    className="w-36 h-36 rounded-full object-cover border-4 border-gray-300 mb-4"
                />
            )}

            <p className="text-lg mb-1"><span className="font-semibold">Name:</span> {user.name}</p>
            <p className="text-lg mb-6"><span className="font-semibold">Email:</span> {user.email}</p>

            <div className="flex gap-4 flex-wrap justify-center mb-6">
                <button onClick={handleLogOut} className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-md transition">
                    Logout
                </button>
                <button onClick={handleUpdateClick} className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-md transition">
                    Update
                </button>
                <button onClick={handleDelete} className="bg-gray-600 hover:bg-gray-700 text-white px-5 py-2 rounded-md transition">
                    Delete
                </button>
            </div>

            {showForm && (
                <form onSubmit={handleSubmitUpdate} className="w-full max-w-sm space-y-4 bg-white p-6 rounded-md shadow-md">
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleFormDataChange}
                        placeholder="Name"
                        required
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormDataChange}
                        placeholder="Email"
                        required
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
                    >
                        Update
                    </button>
                </form>
            )}
        </div>
    );
};

export default Profile;
