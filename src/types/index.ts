export type ProductCategory = 'todos' | 'broaster' | 'burgers' | 'combos';

export interface ProductAddon {
  id: string;
  name: string;
  price: number;
  isIncludedByDefault?: boolean;
  isSauce?: boolean;
  icon?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'broaster' | 'burgers' | 'combos';
  price: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  badgeColor?: 'primary' | 'secondary' | 'tertiary';
  image: string;
  availableAddons: ProductAddon[];
  allowsChaufaOption?: boolean;
  inStock: boolean;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  productName: string;
  basePrice: number;
  quantity: number;
  isChaufa: boolean;
  selectedSauces: string[];
  specialNotes: string;
  itemTotal: number;
  image: string;
}

export type OrderStatus =
  | 'pago_pendiente'
  | 'pago_validado'
  | 'en_cocina'
  | 'listo_entrega'
  | 'entregado'
  | 'rechazado';

export type DeliveryType = 'delivery' | 'recojo' | 'mesa';
export type PaymentMethod = 'yape' | 'plin' | 'efectivo' | 'tarjeta';

export interface YapeVoucher {
  orderId: string;
  voucherCode: string; // e.g. #YAP-9284
  operationCode: string; // e.g. OP-84920419 or 8492
  amount: number;
  senderName: string;
  senderPhone: string;
  timestamp: string;
  channel: string;
  status: 'pendiente' | 'aprobado' | 'sospechoso' | 'rechazado';
  rejectionReason?: string;
  autoChecks: {
    amountMatch: boolean;
    timeWindowValid: boolean;
    notReused: boolean;
    checksumValid: boolean;
  };
  assignedCashier?: string;
  verifiedBy?: string;
  verifiedAt?: string;
}

export interface OrderTimelineEvent {
  status: OrderStatus;
  label: string;
  timestamp: string;
  note: string;
}

export interface Order {
  id: string; // e.g. MYA-0001
  createdAt: string;
  timeAgo: string;
  clientName: string;
  clientPhone: string;
  deliveryType: DeliveryType;
  address?: string;
  tableNumber?: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  yapeVoucher?: YapeVoucher;
  timeline: OrderTimelineEvent[];
  urgent?: boolean;
}

export type AppViewMode = 
  | 'client_catalog'
  | 'client_detail'
  | 'client_checkout'
  | 'client_tracking'
  | 'admin_dashboard'
  | 'admin_yape'
  | 'admin_kitchen'
  | 'admin_security';

export type UserRole = 'cliente' | 'cajero' | 'cocina' | 'admin';

export interface SecurityAuditLog {
  id: string;
  timestamp: string;
  eventType:
    | 'MFA_AUTH_SUCCESS'
    | 'MFA_AUTH_FAILED'
    | 'YAPE_VERIFIED'
    | 'YAPE_DUPLICATE_BLOCKED'
    | 'YAPE_MISMATCH_DETECTED'
    | 'ORDER_PLACED'
    | 'ORDER_STATUS_CHANGED'
    | 'INPUT_SANITIZATION_FLAG';
  severity: 'info' | 'warning' | 'critical';
  description: string;
  operator: string;
  clientIp: string;
}
