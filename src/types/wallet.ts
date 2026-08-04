export interface WalletData {
  usd_balance: number;
  preferred_currency: string | null;
  local_equivalent: number | null;
  fx_mid_rate: number | null;
  fx_updated_at: string | null;

  // ⭐ Add these two
  user_id?: number;
  wallet_id?: number;
}
