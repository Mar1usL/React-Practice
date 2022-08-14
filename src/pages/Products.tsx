import React, { useContext, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Product } from "../models/Product";
import { ProductContext } from "../context/productContext";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { Order } from "../models/Order";

const Products = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [byCategoryAsc, setByCategoryAsc] = useState<boolean>(true);
  const [byPriceAsc, setByPriceAsc] = useState<boolean>(true);

  useDocumentTitle("Products");

  const context = useContext(ProductContext);

  return (
    <section className="products__section">
      {loading ? (
        <p>Loading products...</p>
      ) : !context?.products.length ? (
        <Typography variant="h5" align="center" sx={{ mt: 2 }}>
          There are no products available
        </Typography>
      ) : (
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="products table">
            <TableHead>
              <TableRow>
                <TableCell>
                  Category
                  {byCategoryAsc ? (
                    <KeyboardArrowUpIcon
                      onClick={() => {
                        context.sortCartItems("category", 1);
                        setByCategoryAsc(false);
                      }}
                    />
                  ) : (
                    <KeyboardArrowDownIcon
                      onClick={() => {
                        context.sortCartItems("category", Order.Desc);
                        setByCategoryAsc(true);
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>
                  Price
                  {byPriceAsc ? (
                    <KeyboardArrowUpIcon
                      className="btn-sort"
                      onClick={() => {
                        context.sortCartItems("price", Order.Asc);
                        setByPriceAsc(false);
                      }}
                    />
                  ) : (
                    <KeyboardArrowDownIcon
                      className="btn-sort"
                      onClick={() => {
                        context.sortCartItems("price", Order.Desc);
                        setByPriceAsc(true);
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {context?.products.map((product: Product) => (
                <TableRow key={product.name}>
                  <TableCell component="th" scope="row">
                    {product.category.name}
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => context.handleDecreaseQuantity(product)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="button">Select</Typography>
                    <IconButton
                      onClick={() => context.handleAddToCart(product)}
                    >
                      <AddIcon />
                    </IconButton>
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

export default Products;
