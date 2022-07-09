export enum TickerSymbol {
  BITCOIN = "BITCOIN",
}

export enum BuyOrderType {
  MARKET = "MARKET",
}

export type AccountBalance = {
  availableFunds: number;
};

export type MarketBuyOrderOptions = {
  symbol: TickerSymbol;
  type: BuyOrderType.MARKET;
  volume: number;
};

export type BuyOrderOptions = MarketBuyOrderOptions;

export type TradingService = {
  getAccountBalance: () => Promise<AccountBalance>;
  placeBuyOrder: (options: BuyOrderOptions) => Promise<void>;
};
