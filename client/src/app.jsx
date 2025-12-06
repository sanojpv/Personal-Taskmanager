import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Task from "./pages/Task.jsx";

const isAuthed = () => !!localStorage.getItem("token");

export default function App() {
  return (
    <Routes>
      <Route path="/" element={isAuthed() ? <Navigate to="/login" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/task" element={isAuthed() ? <Task /> : <Navigate to="/login" />} />
    </Routes>
  );
}
