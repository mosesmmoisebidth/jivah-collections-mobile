export interface Product {
  id: string;
  createdAt: string;
  updatedAt: string;
  product_name: string;
  short_description: string[];
  product_description: string[];
  price: number;
  compare_at: number;
  category: string;
  from_date: string;
  reviews: number;
  to_date: string;
  product_image: string;
  product_gallery: string[];
  tags: string[];
  in_stock: boolean;
  sku: string;
  isbn: string;
  quantity: number;
  store_threshold: number;
}
