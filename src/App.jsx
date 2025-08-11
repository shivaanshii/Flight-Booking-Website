import React, {useEffect} from "react";
import {useLocation, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import SearchForm from "./components/SearchForm.jsx";
import SearchResult from "./pages/SearchResult.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import Ticket from "./pages/Ticket.jsx";
import Footer from "./components/Footer.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/searchresult" element={<SearchResult/>} />
            <Route path="/search" element={<SearchForm/>} />
            <Route path="/book" element= {<BookingPage/>} />
            <Route path="/ticket" element= {<Ticket/>} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App
