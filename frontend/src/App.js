import { BrowserRouter as Router , Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthProvider, {/* AuthContext*/ } from "./context/AuthContext";


function App(){
  return(
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/dashboard" element={<ProtectedRoute>
            <Dashboard/>
            </ProtectedRoute>
          } />
        
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;