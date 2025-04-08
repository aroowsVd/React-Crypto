import { Route, Routes } from "react-router-dom"
import Coins from "./pages/Coins"
import Coin from "./pages/Coin"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Coins />} />
      <Route path="/:coinId" element={<Coin />} />
    </Routes>
  )
}

export default App
