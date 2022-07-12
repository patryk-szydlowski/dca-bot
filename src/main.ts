import { SystemLogger } from "./logging/adapter/system";
import { createTradingService, TradingProvider } from "./trading/adapter/factory";
import { BuyOrderType, TickerSymbol } from "./trading/trading-service";
import { runAsyncTask } from "./utils/async";

const program = async () => {
  const logger = new SystemLogger();
  const tradingService = await createTradingService({ provider: TradingProvider.XTB });
  const symbol = TickerSymbol.VWRA_UK;

  await logger.info("Initializing strategy to invest everything into VWRA.UK...");

  await logger.info("Getting account available funds...");

  const { availableFunds } = await tradingService.getAccountBalance();

  await logger.info(`Current available funds are ${availableFunds}`);

  await logger.info("Getting VWRA.UK price...");

  const tikcerPrice = await tradingService.getTickerPrice(symbol);

  await logger.info(`Current VWRA.UK price is roughly ${tikcerPrice}`);

  const purchaseVolume = Math.floor(availableFunds / tikcerPrice);

  await logger.info(
    `Attempting to purchase ${purchaseVolume} VWRA.UK with rough cost of ${availableFunds}`
  );

  await tradingService.placeBuyOrder({
    symbol,
    type: BuyOrderType.MARKET,
    volume: purchaseVolume,
  });

  await logger.info("Market buy order was successfully placed");
};

runAsyncTask(program);
