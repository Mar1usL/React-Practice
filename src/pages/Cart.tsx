import React, { useContext } from "react";

import { ProductContext } from "../context/productContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { CartItem } from "../models/CartItem";

const Cart = () => {
  useDocumentTitle("Cart");

  const context = useContext(ProductContext);
  console.log(context?.cartItems);
  return (
    <section className="cart__section">
      {!context?.cartItems.length ? (
        <Typography variant="h5" align="center" sx={{ mt: 2 }}>
          Your cart is empty
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="cart table"
            className="table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Category</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {context?.cartItems.map((cartItem: CartItem) => (
                <TableRow key={cartItem.name}>
                  <TableCell>{cartItem.category.name}</TableCell>
                  <TableCell>{cartItem.name}</TableCell>
                  <TableCell>{cartItem.quantity}</TableCell>
                  <TableCell>
                    {(cartItem.price * cartItem.quantity).toFixed(2)}
                  </TableCell>
                  <TableCell>
                    (
                    <span
                      className="btn-remove"
                      onClick={() => context.handleDecreaseQuantity(cartItem)}
                    >
                      -
                    </span>
                    )
                    <b
                      className="btn-remove"
                      onClick={() => context.handleRemoveFromCart(cartItem)}
                    >
                      Remove
                    </b>
                    (
                    <span
                      className="btn-add"
                      onClick={() => context.handleIncreaseQuantity(cartItem)}
                    >
                      +
                    </span>
                    )
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </section>
  );
};

export default Cart;
