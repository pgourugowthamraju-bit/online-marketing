export type Category = 'all' | 'grains' | 'produce' | 'oils' | 'supplies' | 'equipment';

export interface WholesaleTier {
  minQty: number;
  price: number;
  discountPercent?: number;
}

export interface Product {
  id: string;
  title: string;
  variety: string;
  category: 'grains' | 'produce' | 'oils' | 'supplies' | 'equipment';
  pricePerUnit: number;
  unit: string; // e.g. 'kg', 'crate (12kg)', 'sack (25kg)', 'tonne', 'bottle (500ml)'
  minOrderQty: number;
  stockQty: number;
  harvestDate: string;
  freshnessDays: number;
  farmName: string;
  farmerName: string;
  location: string;
  certifications: string[]; // e.g. ['USDA Organic', 'Non-GMO Project', 'Fair Trade', 'Regenerative Certified']
  grade: 'A1 Export' | 'Grade A Premium' | 'Food Service Grade' | 'Certified Seed';
  moisturePercent?: number;
  purityPercent?: number;
  packagingType: string;
  description: string;
  image: string;
  wholesaleTiers: WholesaleTier[];
  organic: boolean;
  labTested: boolean;
  shelfLife: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  effectiveUnitPrice: number;
}

export interface CommoditySpot {
  id: string;
  crop: string;
  category: string;
  marketHub: string;
  benchmarkPrice: number;
  unit: string;
  change24h: number;
  changePercent: number;
  trend: 'up' | 'down' | 'flat';
  lastUpdated: string;
  high30d: number;
  low30d: number;
}

export interface RFQItem {
  id: string;
  buyerName: string;
  buyerCompany: string;
  cropRequested: string;
  category: string;
  targetVolume: number;
  unit: string;
  targetPricePerUnit: number;
  deliveryZip: string;
  deliveryDate: string;
  status: 'Open' | 'Quotes Received' | 'Fulfilled';
  dateSubmitted: string;
  notes?: string;
  quotesCount: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  freightCost: number;
  freightType: 'Reefer Cold Chain' | 'Standard Dry Bulk' | 'Direct Farm Gate Pickup';
  total: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  deliveryAddress: string;
  paymentMethod: 'Net-30 Ag Credit' | 'Cash on Delivery (COD)' | 'Instant Bank Transfer / ACH';
  createdAt: string;
  status: 'Order Confirmed' | 'Harvest Inspection' | 'In Transit' | 'Delivered';
  estimatedDeliveryDate: string;
}
