import { Product } from '../ProductInterfaces';

export interface CartProps {
  cartItems: Product[];
  updateQuantity: (index: number, quantity: number) => void;
  increaseQuantity: (index: number) => void;
  decreaseQuantity: (index: number) => void;
  removeProduct: (event: MouseEvent, index: number) => void;
  submitProducts: () => void;
  removeAllProducts: () => void;
}

export interface CartItemProps {
  product: Product;
  index: number;
  updateQuantity: (index: number, quantity: number) => void;
  increaseQuantity: (index: number) => void;
  decreaseQuantity: (index: number) => void;
  removeProduct: (event: MouseEvent, index: number) => void;
}
