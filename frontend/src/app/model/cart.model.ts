import type { Product } from './spare-part.model';

export interface CartItem {
  product: Product;
  quantity: number;
}
