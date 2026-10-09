export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  type: 'Original' | 'OEM' | 'Aftermarket';
  price: number;
  stock: number;
  image: string;
  compatibleCars: string[];
  description: string;
  rating: number;
  reviewCount: number;
}
