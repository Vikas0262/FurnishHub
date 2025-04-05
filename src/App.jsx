import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login/Login.jsx";
import Forget from "./Pages/Forget/Forget.jsx";
import Register from "./Pages/Register/Register";
import Product from "./Pages/Product/Product.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/login" exact={true} element={<Login />} />
        <Route path="/forget" exact={true} element={<Forget />} />
        <Route path="/register" exact={true} element={<Register />} />
        <Route path="/product" exact={true} element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
