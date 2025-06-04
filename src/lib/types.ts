
import type { Timestamp } from 'firebase/firestore';

export interface Product {
  id: string;
  name: string; // Bangla
  description: string; // Bangla
  price: number;
  imageUrl: string;
  category?: string; // Bangla
  stockQuantity?: number; // New: Stock Quantity
  dataAihint?: string;
  createdAt?: Timestamp | string; // Allow string for client-side new Date().toISOString() before Firestore conversion
  updatedAt?: Timestamp | string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
  registrationDate?: Timestamp | string; // ISO string or Date object, or Firestore Timestamp
}

export type Thana = { id: string; name: string };
export type District = { id: string; name: string; thanas: Thana[] };
export type Division = { id: string; name: string; districts: District[] };

// Order related types
export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  imageUrl?: string;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  division: string;
  district: string;
  thana: string;
  notes?: string;
}
export interface Order {
  id: string; // Firestore document ID
  orderNumber: string; // Human-readable order number e.g., BS-12345
  userId: string; // Firebase Auth UID of the customer
  customerName: string; // Denormalized for easy display
  customerEmail: string; // Denormalized for easy display
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  orderDate: Timestamp | string; // Firestore Timestamp or ISO string representation of the date
  shippingAddress: ShippingAddress;
  paymentMethod?: string; // e.g., 'Cash on Delivery'
  transactionId?: string; // If online payment
}

