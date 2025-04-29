import "./App.css";
import { BrowserRouter as Router, useLocation } from "react-router-dom";
import Header from "./component/Header/Header.jsx";
import Footer from './component/Footer/Footer.jsx';
import { AppRoutes, HIDE_HEADER_PATHS } from './routes';

function AppContent() {
  const location = useLocation();
  const shouldShowHeader = !HIDE_HEADER_PATHS.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {shouldShowHeader && <Header />}
      <div className="flex-grow">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
