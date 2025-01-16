export interface Product {
  id: string;
  createdAt: string;
  updatedAt: string;
  product_name: string;
  short_description: string[];
  product_description: string[];
  regular_price: number;
  sale_price: number;
  discount_price: number;
  category: string;
  from_date: string;
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
