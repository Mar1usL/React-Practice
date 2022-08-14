import { Category } from "./Category";

export interface CartItem {
    id: number;
    category: Category;
    name: string;
    price: number;
    quantity: number;
}