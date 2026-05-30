export interface CookieProduct {
  id: string;
  name: string;
  tagline: string;
  price: number; // in PHP
  description: string;
  image: string;
  accentColor: string;
  rating: number;
  ingredients: string[];
  nutrition: {
    calories: number;
    protein: string;
    fat: string;
    carbs: string;
  };
  bestseller?: boolean;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface CustomOrder {
  productId: string;
  quantity: number;
  packagingId: string;
  giftMessage?: string;
  deliveryDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
}

export interface PackagingOption {
  id: string;
  name: string;
  price: number; // in PHP
  description: string;
  colorClass: string;
}
