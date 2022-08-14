import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import ProductProvider from "./ProductProvider";

const Layout = () => {
  return (
    <React.Fragment>
      <ProductProvider>
        <Navbar />
        <main className="main-container">
          <Outlet />
        </main>
      </ProductProvider>
    </React.Fragment>
  );
};

export default Layout;
