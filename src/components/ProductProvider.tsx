import React, { FC, useEffect, useState } from "react";
import axios from "axios";

import { ProductContext } from "../context/productContext";
import { CartItem } from "../models/CartItem";
import { Product } from "../models/Product";
import { Order } from "../models/Order";

interface IProductProvider {
  children: React.ReactNode;
}

const ProductProvider: FC<IProductProvider> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [itemsCount, setItemsCount] = useState<number>(0);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>(
        "http://localhost:3001/api/products/"
      );
      if (response.data) {
        setProducts(response.data);
      }
    } catch (e: unknown) {
      console.log(e);
    }
  };

  const handleAddToCart = (product: any) => {
    setCartItems((prevState) => {
      const cartProduct = prevState?.find(
        (item: CartItem) => item.name === product.name
      );
      if (cartProduct) {
        setItemsCount((prevCount) => prevCount + 1);
        return prevState.map((item: CartItem) =>
          item.name === product.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        setItemsCount((prevCount: number) => prevCount + 1);
        return [...prevState, { ...product, quantity: 1 }];
      }
    });
  };

  const handleIncreaseQuantity = (cartItem: CartItem) => {
    setCartItems((prevState) => {
      const itemToIncrease = cartItems.find(
        (item: CartItem) => item.name === cartItem.name
      );

      if (itemToIncrease) {
        setItemsCount((prevCount: number) => prevCount + 1);
        return prevState.map((item: CartItem) =>
          item.name === itemToIncrease.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevState];
      }
    });
  };

  const handleDecreaseQuantity = (product: any) => {
    setCartItems((prevState) => {
      const itemToDecrease = prevState.find((item: CartItem) => item.name === product.name); 

      if (itemToDecrease) {
        if (itemToDecrease.quantity === 1) {
          setItemsCount((prevCount: number) => prevCount - 1); 
          prevState.splice(prevState.indexOf(itemToDecrease), 1); 
          return [...prevState];
        }
        else {
          setItemsCount((prevCount: number) => prevCount - 1);
          return prevState.map((item: CartItem) => item.name === itemToDecrease.name ? { ...item, quantity: item.quantity - 1 } : item);
        }
      } 
      return [...prevState];
    })
  };

  const handleRemoveFromCart = (product: CartItem) => {
    const productToRemove = cartItems.find(
      (item) => item.name === product.name
    );
    if (productToRemove) {
      cartItems.splice(cartItems.indexOf(productToRemove), 1);
      setCartItems([...cartItems]);
      setItemsCount(
        (prevCount: number) => prevCount - productToRemove.quantity
      );
    }
  };

  const sortCartItems = (key: string, sortOrder: Order) => {
    const sortDescending = sortOrder === Order.Desc ? -1 : 1;

    if (key === "category") {
      const sortedByCategory = products.sort(
        (a, b) =>
          sortDescending * a.category.name.localeCompare(b.category.name)
      );
      setProducts([...sortedByCategory]);
    }

    if (key === "price") {
      const sortedByPrice = products.sort(
        (a: Product, b: Product) => sortDescending * (a.price - b.price)
      );
      setProducts([...sortedByPrice]);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        itemsQuantity: itemsCount,
        products: products,
        cartItems: cartItems,
        handleAddToCart: handleAddToCart,
        handleIncreaseQuantity: handleIncreaseQuantity,
        handleDecreaseQuantity: handleDecreaseQuantity,
        handleRemoveFromCart: handleRemoveFromCart,
        sortCartItems: sortCartItems,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
