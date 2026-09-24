export interface WalletData {
  usd_balance: number;
  preferred_currency: string | null;

  // ⭐ Local equivalent based on sell_rate
  local_equivalent: number | null;

  // ⭐ Old field (keep optional if backend still sends it)
  fx_mid_rate?: number | null;

  // ⭐ NEW FIELD — required by EsimShop, BundlesModal, DetailsModal, CheckoutModal
  fx_sell_rate: number | null;

  fx_updated_at: string | null;

  // ⭐ Optional metadata
  user_id?: number;
  wallet_id?: number;
}
