import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/login'
import AdminHome from "./pages/admin/adminHome";
import RegisterForm from "./pages/admin/registerForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/adduser" element={<RegisterForm/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

