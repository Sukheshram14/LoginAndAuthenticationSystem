import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // State to control bouncing animation
  const [logoBounce, setLogoBounce] = useState(true);

  // Stop bouncing after 3 seconds
  useEffect(() => {
    const timeout = setTimeout(() => setLogoBounce(false), 3000);
    return () => clearTimeout(timeout);
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message);
      }

      login(result.token);
      navigate("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-900 via-indigo-700 to-pink-600">
      <div className="text-center text-white animate-fade-in">
        
        {/* Logo with temporary bounce */}
        <div className="mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            alt="logo"
            className={`w-16 mx-auto transition-all ${logoBounce ? "animate-bounce" : "opacity-100"}`}
          />
        </div>

        <h1 className="text-3xl font-bold">Welcome to UptoSkills</h1>
        <p className="text-sm text-gray-300">Your journey to new skillsets starts here</p>

        {/* Glassmorphic Card */}
        <div className="mt-6 p-8 rounded-2xl shadow-xl w-96 border border-white/30 bg-white/10 backdrop-blur-xl relative animate-slide-up">
          
          {/* Fix: Non-blocking overlay */}
          <div className="absolute inset-0 bg-white/5 rounded-2xl blur-3xl opacity-20 pointer-events-none z-[-1]"></div>

          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* Email Input */}
            <div className="relative mb-4">
              <input
                type="email"
                placeholder="Email Address"
                {...register("email", { required: "Email is required" })}
                className="w-full p-3 pl-12 bg-white/20 text-white rounded-md focus:outline-none border border-transparent focus:border-blue-400 placeholder-gray-300 backdrop-blur-md shadow-inner transition-all duration-300 focus:scale-105"
              />
              <span className="absolute left-4 top-3 text-gray-300 text-lg">📧</span>
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>

            {/* Password Input */}
            <div className="relative mb-4">
              <input
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-3 pl-12 bg-white/20 text-white rounded-md focus:outline-none border border-transparent focus:border-blue-400 placeholder-gray-300 backdrop-blur-md shadow-inner transition-all duration-300 focus:scale-105"
              />
              <span className="absolute left-4 top-3 text-gray-300 text-lg">🔒</span>
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-blue-400 to-pink-500 text-white font-semibold rounded-md transition-all duration-300 hover:scale-105 hover:shadow-[0px_0px_20px_rgba(255,255,255,0.7)] hover:brightness-110"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-gray-300">Or continue with</p>

          {/* Social Login Buttons */}
          <div className="flex justify-center space-x-4 mt-4">
            <button className="flex items-center space-x-2 bg-white/20 p-3 rounded-md transition-all duration-300 hover:bg-white/30 hover:scale-110 hover:shadow-md">
              <img src="https://cdn-icons-png.flaticon.com/512/2702/2702602.png" alt="Google" className="w-5" />
              <span className="text-white">Google</span>
            </button>
            <button className="flex items-center space-x-2 bg-white/20 p-3 rounded-md transition-all duration-300 hover:bg-white/30 hover:scale-110 hover:shadow-md">
              <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="LinkedIn" className="w-5" />
              <span className="text-white">Facebook</span>
            </button>
          </div>

          {/* Signup Redirect */}
          <p className="mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-blue-300 hover:text-blue-500 transition-all">
              Signup
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
