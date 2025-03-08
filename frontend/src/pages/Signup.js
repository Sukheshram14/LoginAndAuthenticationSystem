import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      alert("User registered successfully");
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return React.createElement(
    "div",
    { className: "relative flex justify-center items-center min-h-screen overflow-hidden" },
    // Moving Gradient Background
    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-purple-800 via-pink-600 to-blue-500 animate-gradient-move" }),
    // Content Wrapper
    React.createElement(
      "div",
      { className: "relative text-center text-white animate-fade-in z-10" },
      React.createElement("h1", { className: "text-4xl font-bold" }, "Create an Account"),
      React.createElement("p", { className: "text-gray-300" }, "Join us and explore new skills"),

      // Glassmorphic Form
      React.createElement(
        "div",
        { className: "mt-6 p-8 rounded-2xl shadow-xl w-96 border border-white/30 bg-white/10 backdrop-blur-xl relative animate-slide-up" },

        React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
          // Name Input
          React.createElement("div", { className: "relative mb-4" },
            React.createElement("input", {
              type: "text",
              placeholder: "Full Name",
              ...register("name", { required: "Name is required" }),
              className: "w-full p-3 pl-12 bg-white/20 text-white rounded-md focus:outline-none border border-transparent focus:border-blue-400 placeholder-gray-300 backdrop-blur-md shadow-inner transition-all duration-300 focus:scale-105"
            }),
            React.createElement("span", { className: "absolute left-4 top-3 text-gray-300 text-lg" }, "👤"),
            errors.name && React.createElement("p", { className: "text-red-500 text-xs" }, errors.name.message)
          ),

          // Email Input
          React.createElement("div", { className: "relative mb-4" },
            React.createElement("input", {
              type: "email",
              placeholder: "Email Address",
              ...register("email", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
              }),
              className: "w-full p-3 pl-12 bg-white/20 text-white rounded-md focus:outline-none border border-transparent focus:border-blue-400 placeholder-gray-300 backdrop-blur-md shadow-inner transition-all duration-300 focus:scale-105"
            }),
            React.createElement("span", { className: "absolute left-4 top-3 text-gray-300 text-lg" }, "📧"),
            errors.email && React.createElement("p", { className: "text-red-500 text-xs" }, errors.email.message)
          ),

          // Password Input
          React.createElement("div", { className: "relative mb-4" },
            React.createElement("input", {
              type: "password",
              placeholder: "Password",
              ...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters" },
              }),
              className: "w-full p-3 pl-12 bg-white/20 text-white rounded-md focus:outline-none border border-transparent focus:border-blue-400 placeholder-gray-300 backdrop-blur-md shadow-inner transition-all duration-300 focus:scale-105"
            }),
            React.createElement("span", { className: "absolute left-4 top-3 text-gray-300 text-lg" }, "🔒"),
            errors.password && React.createElement("p", { className: "text-red-500 text-xs" }, errors.password.message)
          ),

          // Submit Button
          React.createElement("button", {
            type: "submit",
            className: "w-full p-3 bg-gradient-to-r from-blue-400 to-pink-500 text-white font-semibold rounded-md transition-all duration-300 hover:scale-105 hover:shadow-[0px_0px_20px_rgba(255,255,255,0.7)] hover:brightness-110"
          }, "Sign Up")
        ),

        React.createElement("p", { className: "mt-4 text-gray-300" },
          "Already have an account? ",
          React.createElement("a", { href: "/", className: "text-blue-300 hover:text-blue-500 transition-all" }, "Login")
        )
      )
    )
  );
}

export default Signup;
