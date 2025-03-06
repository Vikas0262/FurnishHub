
import './App.css'
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from './Pages/Home.jsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
