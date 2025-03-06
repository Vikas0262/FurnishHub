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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<Home />} />
        <Route path="/login" exact={true} element={<Login />} />
        <Route path="/forget" exact={true} element={<Forget />} />
        <Route path="/register" exact={true} element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
