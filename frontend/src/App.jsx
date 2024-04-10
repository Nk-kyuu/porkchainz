import './App.css'
import { BrowserRouter, Routes, Route, } from 'react-router-dom'
//import FarmerAdd from "./pages/farmer/farmerAdd"
import FarmerDashBatch from "./pages/farmer/farmerDashBatch"
import SlaughtererAdd from './pages/slaughterer/slaughtererAdd';
import SlaughtererSend from './pages/slaughterer/slaughtererSend';
import FarmerAddBatch from './pages/farmer/farmerAddBatch';
import FarmerDashPig from "./pages/farmer/farmerDashPig"
import SlaughtererDash from "./pages/slaughterer/slaughtererDash"
import SlaughtererProduct from "./pages/slaughterer/slaughtererProduct"
import SlaughtererAddShip from "./pages/slaughterer/slaughtererAddShip"
import RetailerDash from "./pages/retailer/retailerDash"
import Login from './pages/login/login'
import AdminHome from "./pages/admin/adminHome";
import RegisterForm from "./pages/admin/registerForm";
import LoginAdmin from './pages/login/loginAdmin';
import AddAdmin from './pages/admin/addAdmin';
import Consumer from './pages/consumer/consumer'
import TestPig from './pages/farmer/TestPig';
import TestDash from './pages/farmer/testDash'
import Test from './pages/farmer/ffd'
import FarmerD from './pages/farmer/farmerD'
function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<LoginAdmin/>} />
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/adduser" element={<RegisterForm />} />
          <Route path="/admin/addadmin" element={<AddAdmin/>} />
          <Route path="/farmerDashPig" element={<FarmerDashPig />} />
          <Route path="/slaughtererDash" element={<SlaughtererDash />} />
          <Route path="/slaughtererProduct" element={<SlaughtererProduct />} />
          <Route path="/slaughtererAddShip" element={<SlaughtererAddShip />} />
          <Route path="/retailerDash" element={<RetailerDash />} />
          {/* <Route path="/farmerAdd" element={<FarmerAdd />} /> */}
          <Route path="/farmerDashBatch" element={<FarmerDashBatch />} />
          <Route path="/slaughtererAdd" element={<SlaughtererAdd />} />
          <Route path="/slaughtererSend" element={<SlaughtererSend />} />
          <Route path="/farmerAddBatch" element={<FarmerAddBatch />}/>
          <Route path="/consumer/:shipmentID" element={<Consumer/>} />
          <Route path="testPig" element={<TestPig/>} />
          <Route path="/testDash" element={<TestDash/>} />
          <Route path="/test" element={<Test/>} />   
          <Route path="/farmerD" element={<FarmerD/>} />
        </Routes>
      </BrowserRouter >
    </div>
  )

}

export default App;

