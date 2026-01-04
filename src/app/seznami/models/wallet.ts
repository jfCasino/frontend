// wallet-response.ts
export interface WalletResponse {
  walletID: string;
  userID: string;
  balance: number;
}

// create-wallet-request.ts
export interface CreateWalletRequest {
  userID: string;
}


