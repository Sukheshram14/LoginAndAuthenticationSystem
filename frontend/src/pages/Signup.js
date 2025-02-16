import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.name, // Changed to match backend
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }
      alert("User registered successfully");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="justify-center flex flex-col items-center h-screen bg-teal-800">
      <div className="text-2xl font-black">Sign Up</div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/4"
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name :"
            {...register("name", { required: "Name is required" })}
            className="border rounded w-full py-2 px-3 mb-4"
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name.message}</p>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
          </div>
          <input
            type="email"
            placeholder="Enter your email :"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Enter a valid email",
              },
            })}
            className="border rounded w-full py-2 px-3"
          />
          {errors.email && (
            <p className=" text-red-500 text-xs">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold
                    mb-2"
          >
            Password
          </label>
          <input
            type="password"
            placeholder="Enter your Password :"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="border rounded w-full py-2 px-3"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-3 px-4 rounded"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4">
        Already have an account?
        <a href="/" className="font-bold text-blue-500">
          Login
        </a>
      </p>
    </div>
  );
}

export default Signup;
