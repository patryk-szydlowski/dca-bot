import XTBClient, { CMD_FIELD, TYPE_FIELD } from "xapi-node";

import { timeout } from "../../../utils/promises";
import {
  type AccountBalance,
  type BuyOrderOptions,
  type MarketBuyOrderOptions,
  type TickerSymbol,
  type TradingService,
  BuyOrderType,
} from "../../trading-service";

type ConstructorOptions = XTBServiceOptions & {
  accountId: string;
  accountPassword: string;
  accountType: "demo" | "real";
  xtbHost: string;
};

type XTBServiceOptions = {
  operationTimeoutMs: number;
};

export class XTBTradingService implements TradingService {
  private constructor(
    private readonly tradingClient: XTBClient,
    private readonly options: XTBServiceOptions
  ) {}

  public static async create(options: ConstructorOptions): Promise<TradingService> {
    const tradingClient = new XTBClient({
      accountId: options.accountId,
      host: options.xtbHost,
      password: options.accountPassword,
      type: options.accountType,
    });

    await tradingClient.connect({ timeout: options.operationTimeoutMs });

    return new XTBTradingService(tradingClient, options);
  }

  public async getAccountBalance(): Promise<AccountBalance> {
    await this.tradingClient.Stream.subscribe.getBalance();

    const balancePromise = new Promise<AccountBalance>((resolve) => {
      const listener = this.tradingClient.Stream.listen.getBalance((accountBalance) => {
        listener.stopListen();
        resolve({ availableFunds: accountBalance.marginFree });
      });
    });

    try {
      return await timeout(balancePromise, this.options.operationTimeoutMs);
    } finally {
      await this.tradingClient.Stream.unSubscribe.getBalance();
    }
  }

  public async getTickerPrice(tickerSymbol: TickerSymbol): Promise<number> {
    await this.tradingClient.Stream.subscribe.getTickPrices(tickerSymbol);

    const tickerPricePromise = new Promise<number>((resolve) => {
      const listener = this.tradingClient.Stream.listen.getTickPrices((price) => {
        listener.stopListen();
        resolve(price.ask);
      });
    });

    try {
      return await timeout(tickerPricePromise, this.options.operationTimeoutMs);
    } finally {
      await this.tradingClient.Stream.unSubscribe.getBalance();
    }
  }

  public async placeBuyOrder(options: BuyOrderOptions): Promise<void> {
    switch (options.type) {
      case BuyOrderType.MARKET: {
        await this.placeMarketBuyOrder(options);
      }
    }
  }

  private async placeMarketBuyOrder(options: MarketBuyOrderOptions): Promise<void> {
    const { symbol, volume } = options;
    const expiration = this.tradingClient.serverTime + this.options.operationTimeoutMs;

    await this.tradingClient.Socket.send.tradeTransaction({
      cmd: CMD_FIELD.BUY,
      customComment: "Bought with DCA bot",
      expiration,
      offset: 0,
      order: 0,
      price: 1,
      sl: 0,
      symbol,
      tp: 0,
      type: TYPE_FIELD.OPEN,
      volume,
    });
  }
}
