
import { BrowserRouter,Route,Routes } from "react-router-dom"
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
        </Routes>
      </BrowserRouter >
    </div>
  )
}

export default App
