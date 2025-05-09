import "./App.css";
import React from 'react';
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Header from "./component/Header.jsx";
import Footer from './component/Footer.jsx';
import { AppRoutes, HIDE_HEADER_PATHS } from './routes';

const AppContent = () => {
  const location = useLocation();
  const shouldHideHeader = HIDE_HEADER_PATHS.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!shouldHideHeader && <Header />}
      <div className="flex-grow">
        <AppRoutes />
      </div>
      {!shouldHideHeader && <Footer />}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
