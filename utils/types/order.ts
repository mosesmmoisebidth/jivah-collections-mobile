type ProductVariant = {
  id: string;
  productId: string;
  color: string;
  size: string;
  deleted: boolean;
  product: {
    id: string;
    name: string;
    description: string;
    categoryId: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    deleted: boolean;
    reviews: {
      id: string;
      comment: string;
      image: string;
      rating: number;
      createdAt: string;
      updatedAt: string;
    }[];
  };
};

type Inventory = {
  id: string;
  variantId: string;
  quantity: number;
  price: number;
  updatedAt: string;
  createdAt: string;
  deleted: boolean;
  variant: ProductVariant;
};

type SaleItem = {
  id: string;
  quantity: number;
  amount: number;
  saleId: string;
  image: string;
  inventoryId: string;
  inventory: Inventory;
};

type SaleClient = {
  id: string;
  saleId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
};

export type Order = {
  id: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  saleClient: SaleClient[];
  items: SaleItem[];
};
