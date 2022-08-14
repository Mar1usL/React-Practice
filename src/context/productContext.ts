import { createContext } from "react"; 

import { CartItem } from "../models/CartItem";
import { Product } from "../models/Product";
import { Order } from "../models/Order";

interface ProductContextInterface {
    itemsQuantity: number;
    products: Product[];
    cartItems: CartItem[];
    handleAddToCart: (product: Product) => void;
    handleIncreaseQuantity: (cartItem: CartItem) => void;
    handleDecreaseQuantity: (product: Product) => void;
    handleRemoveFromCart: (product: CartItem) => void;
    sortCartItems: (key: string, sortOrder: Order) => void;
}

const ProductContext = createContext<ProductContextInterface>({} as ProductContextInterface);

export { ProductContext };