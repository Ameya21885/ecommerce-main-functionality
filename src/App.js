import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Products from "./components/products/Products";
import SingleProducts from "./components/products/SingleProducts";
import AddToCart from "./components/addtocart/AddToCart";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Products />} />
          {/* <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="products" element={<Products />} /> */}
          <Route path="singleproducts" element={<SingleProducts />} />
          <Route path="addtocart" element={<AddToCart />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
