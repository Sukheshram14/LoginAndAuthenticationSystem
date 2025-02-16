import React, { useContext } from "react";
import { useForm } from "react-hook-form"; // Import react-hook-form for handling form inputs
import {  useNavigate } from "react-router-dom"; // Import useNavigate to redirect users after login
import { AuthContext } from "../context/AuthContext";

function Login() {
  // useForm hook for managing form inputs and errors
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // useNavigate helps in redirecting users after successful login
  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/* Email Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className="border rounded w-full py-2 px-3"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Password Input */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
            className="border rounded w-full py-2 px-3"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>

      {/* Link to go to the Signup page */}
      <p className="mt-4">
        Don't have an account?{" "}
        <a href="/signup" className="text-blue-500">
          Signup
        </a>
      </p>
    </div>
  );
}

export default Login;
