/**
 * Represents a single roulette bet.
 * Mirrors the Java SingleBetRequest DTO.
 */
export interface SingleBetRequest {
  /** Type of the roulette bet: "NUMBER", "COLOR", "ODD_EVEN", "THIRDS" */
  betType: 'NUMBER' | 'COLOR' | 'ODD_EVEN' | 'THIRDS';
  
  /** Target value of the bet, depending on bet type, e.g., "17", "RED", "ODD", "1ST" */
  target: string;
  
  /** Amount of money wagered on this bet, must be >= 1 */
  amount: number;
}

/**
 * Request payload for placing multiple roulette bets in a single spin.
 * Mirrors the Java MultiBetRequest DTO.
 */
export interface MultiBetRequest {
  /** Unique identifier of the user placing the bets */
  userID: string;

  /** List of individual bets placed by the user */
  bets: SingleBetRequest[];
}

/**
 * Represents the outcome of a single bet in the MultiBetResponse.
 */
export interface SingleBetResult  {
  betType: 'NUMBER' | 'COLOR' | 'ODD_EVEN' | 'THIRDS';
  target: string;
  amount: number;
  isWin: boolean;
  payout: number;
}

/**
 * Response returned after placing multiple bets.
 */
export interface MultiBetResponse {
  userID: string;
  spinResultColor: string;
  spinResultNumber: number;
  betResults: SingleBetResult[];
  totalWinnings: number;
}