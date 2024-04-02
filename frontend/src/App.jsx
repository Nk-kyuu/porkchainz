import React from 'react'
import './App.css'
import { BrowserRouter,Routes,Route, } from 'react-router-dom'
import FarmerAdd from "./pages/farmer/farmerAdd"
import FarmerDashBatch from "./pages/farmer/farmerDashBatch"
import SlaughtererAdd from './pages/slaughterer/slaughtererAdd';
import SlaughtererSend from './pages/slaughterer/slaughtererSend';
import FarmerAddBatch from './pages/farmer/farmerAddBatch';

import FarmerDashPig from "./pages/farmer/farmerDashPig"
import SlaughtererDash from "./pages/slaughterer/slaughtererDash"
import SlaughtererProduct from "./pages/slaughterer/slaughtererProduct"
import SlaughtererAddShip from "./pages/slaughterer/slaughtererAddShip"
import RetailerDash from "./pages/retailer/retailerDash"
function App() {
  

  return (
    <div className="App">
      <BrowserRouter >
        <Routes>
          <Route path="/farmerDashPig" element={<FarmerDashPig/>}/>
          <Route path="/slaughtererDash" element={<SlaughtererDash/>}/>
          <Route path="/slaughtererProduct" element={<SlaughtererProduct />}/>
          <Route path="/slaughtererAddShip" element={<SlaughtererAddShip />}/>
          <Route path="/retailerDash" element={<RetailerDash />}/>
          <Route path="/farmerAdd" element={<FarmerAdd/>} />
          <Route path="/farmerDashBatch" element={<FarmerDashBatch/>} />
          <Route path= "/slaughtererAdd" element={<SlaughtererAdd/>} />
          <Route path="/slaughtererSend" element={<SlaughtererSend/>} />
          <Route path="/farmerAddBatch" element={<FarmerAddBatch/>} />
        </Routes>
      </BrowserRouter >
    </div>
  )
  
}

export default App
