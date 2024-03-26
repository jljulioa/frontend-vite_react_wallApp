import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import SecureRoute from "./SecureRoute";
import Navbar from './components/Navbar.jsx'
import UploadWall from "./pages/UploadWall.jsx";



export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route element={<SecureRoute/>}>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/uploadwall" element={<UploadWall/>} />
          </Route>
        </Routes>
      </BrowserRouter>
   </AuthProvider>
  )
}
