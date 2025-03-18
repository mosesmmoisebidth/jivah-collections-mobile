export type ProductType = {
  id?: string;
  price: number;
  quantity: number;
  image: string;
  updatedAt: string;
  discounts: any[];
  name: string;
  description: string;
  category:
    | string
    | {
        name: string;
      };
  tags: string[];
  color: string;
  size: string;
  productId: string;
  createdAt: string;
  deleted: boolean;
  images: { id: string; url: string; color: string; productId: string }[];
  variants: {
    id: string;
    productId: string;
    color: string;
    size: string;
    Inventory: {
      id: string;
      variantId: string;
      quantity: number;
      price: number;
      updatedAt: string;
    }[];
  }[];
  reviews: ReviewType[];
};

export type CartItemType = {
  id?: string;
  price: number;
  product: {
    id: string;
    name: string;
    image: string;
    color: string;
    size: string;
  };
  quantity: number;
};

export type ReviewType = {
  id: string;
  comment: string;
  rating: number;
};

export type ProductFilters = {
  category: string;
  tags: string[];
  priceRange: [number, number];
};

export type CategoryType = {
  id: string;
  name: string;
  image: string;
};
