/**
 * Represents a single bet response in the statistics service.
 * Mirrors the Java BetResponse DTO.
 */
export interface BetResponse {
  /** Unique identifier of the bet */
  id: string;           // UUID as string
  /** Unique identifier of the user who placed the bet */
  userId: string;
  /** Identifier of the game associated with the bet (e.g., "roulette") */
  gameId: string;
  /** Total stake amount placed in the bet */
  totalStake: number;
  /** Total winnings from the bet */
  totalWinnings: number;
  /** Timestamp when the bet was created */
  createdAt: string;    // ISO string, e.g., "2026-01-03T10:15:30Z"
}

/**
 * Represents a wallet in leaderboard responses.
 * Mirrors the WalletResponse DTO.
 */
export interface WalletResponse {
  walletID: string;
  balance: number;
}
