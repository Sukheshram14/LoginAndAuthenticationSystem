// API Base URL
const API_URL = "http://localhost:5000/api/auth";

// Selecting elements
const alertBox = document.getElementById("alert");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const logoutBtn = document.getElementById("logoutBtn");
const profileSection = document.getElementById("profile");
const usernameDisplay = document.getElementById("username");

// ** Show alert messages **
function showAlert(message, type = "error") {
    alertBox.textContent = message;
    alertBox.className = `p-2 mb-4 rounded text-center ${type === "error" ? "bg-red-500" : "bg-green-500"}`;
    alertBox.classList.remove("hidden");
    setTimeout(() => alertBox.classList.add("hidden"), 3000);
}

// ** Toggle between login and register forms **
document.getElementById("showLogin").addEventListener("click", () => {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
});

document.getElementById("showRegister").addEventListener("click", () => {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
});

// ** Handle Registration **
registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const username = document.getElementById("registerUsername").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    showAlert(data.message, response.ok ? "success" : "error");

    if (response.ok) registerForm.reset();
});

// ** Handle Login **
loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem("token", data.token);
        showUserProfile();
    } else {
        showAlert(data.message, "error");
    }
});

// ** Show User Profile After Login **
async function showUserProfile() {
    const token = localStorage.getItem("token");
    if (!token) return;

    const response = await fetch(`${API_URL}/profile`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await response.json();

    if (response.ok) {
        usernameDisplay.textContent = data.user.username;
        loginForm.classList.add("hidden");
        registerForm.classList.add("hidden");
        logoutBtn.classList.remove("hidden");
        profileSection.classList.remove("hidden");
    } else {
        localStorage.removeItem("token");
    }
}

// ** Handle Logout **
logoutBtn.addEventListener("click", async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
    });

    localStorage.removeItem("token");
    showAlert("Logged out successfully ✅", "success");
    setTimeout(() => location.reload(), 1000);
});

// ** Check if User is Logged In on Page Load **
document.addEventListener("DOMContentLoaded", showUserProfile);