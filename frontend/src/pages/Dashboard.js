import React,{useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Dashboard(){

    const {user,logout,loading}=useContext(AuthContext);

    const navigate=useNavigate();
    useEffect(()=>{

        if (!user && !loading) {
            navigate("/");
        }
    },[user,loading,navigate]);

    if (loading) return <div>Loading...</div>;

    if (!user) return <div>Redirecting...</div>;

    return(
        <div className="flex flex-col h-screen items-center justify-center bg-teal-700 font-extrabold text-2xl">
            <h1>Welcome, {user.email}!</h1>
            <button onClick={logout} className="bg-red-500 text-white py-2 px-4 mt-4 rounded-md">logout</button>
        </div>
    )
}
export default Dashboard;
