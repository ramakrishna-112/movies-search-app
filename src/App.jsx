import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import WatchLater from "./pages/WatchLater";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./contexts/MovieContext";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer"; // Make sure Footer is here

function App() {
  return (
    <MovieProvider>
      <div className="main-content">
        <NavBar />
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/watch-later" element={<WatchLater />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </MovieProvider>
  );
}

export default App;
