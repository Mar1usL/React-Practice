import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { ProductContext } from "../context/productContext";

const Navbar = () => {
  const context = useContext(ProductContext);

  return (
    <nav className="navbar">
      <ul className="navbar__routes">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/cart">
          <Badge badgeContent={context?.itemsQuantity} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </Link>
      </ul>
    </nav>
  );
};

export default Navbar;
