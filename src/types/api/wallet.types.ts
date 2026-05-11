// =============================================
// 💰 Wallet Types - AqarZain API
// =============================================

export type TransactionType = 'purchase' | 'feature_payment' | 'refund' | 'bonus' | 'signup_bonus';
export type TransactionStatus = 'completed' | 'pending' | 'failed' | 'cancelled';
export type PaymentMethod = 'card' | 'bank_transfer' | 'instapay' | 'vodafone_cash';

export interface Wallet {
  id: string;
  user_id: string;
  balance: number;
  purchased_balance: number;
  free_balance: number;
  free_balance_expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface WalletTransaction {
  id: string;
  wallet_id: string;
  type: TransactionType;
  amount: number;
  description: string;
  reference_id: string | null;
  status: TransactionStatus;
  payment_method: PaymentMethod | null;
  metadata: Record<string, unknown>;
  created_at: string;
}

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  price: number;
  bonus_credits: number;
  is_recommended: boolean;
  is_active: boolean;
}

export interface PurchasePayload {
  package_id: string;
  payment_method: PaymentMethod;
}

export interface PurchaseResponse {
  data: {
    transaction_id: string;
    payment_url?: string;
    redirect_url?: string;
    status: TransactionStatus;
  };
}

export interface WalletBalanceResponse {
  data: {
    wallet: Wallet;
  };
}

export interface WalletTransactionsResponse {
  data: WalletTransaction[];
  meta: {
    total: number;
    page: number;
    per_page: number;
  };
}
