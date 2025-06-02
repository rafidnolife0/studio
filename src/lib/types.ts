export interface Product {
  id: string;
  name: string; // Bangla
  description: string; // Bangla
  price: number;
  imageUrl: string;
  category?: string; // Bangla
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  // Add other user-related fields if needed
}

export type Thana = { id: string; name: string };
export type District = { id: string; name: string; thanas: Thana[] };
export type Division = { id: string; name: string; districts: District[] };
