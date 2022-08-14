import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Products from "./pages/Products";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />}/>
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
          </Route>
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
