import { SystemLogger } from "./logging/adapter/system";
import { createTradingService, TradingProvider } from "./trading/adapter/factory";
import { BuyOrderType, TickerSymbol } from "./trading/trading-service";
import { runAsyncTask } from "./utils/async";

const program = async () => {
  const logger = new SystemLogger();
  const tradingService = await createTradingService({ provider: TradingProvider.XTB });

  await logger.info("Getting BTC price...");
  const btcPrice = await tradingService.getTickerPrice(TickerSymbol.BITCOIN);
  await logger.info(`BTC price is: ${btcPrice}`);

  await logger.info("Placing order on BTC...");
  await tradingService.placeBuyOrder({
    symbol: TickerSymbol.BITCOIN,
    type: BuyOrderType.MARKET,
    volume: 0.01,
  });
  await logger.info("BTC order placed!");
};

runAsyncTask(program);
