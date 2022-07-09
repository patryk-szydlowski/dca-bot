import { SystemLogger } from "./logging/adapter/system";
import { createTradingService, TradingProvider } from "./trading/adapter/factory";
import { checkBalance } from "./trading/use-cases/check-balance";

const program = async () => {
  const logger = new SystemLogger();
  const tradingService = await createTradingService({ provider: TradingProvider.XTB });

  await checkBalance({ logger, tradingService });
};

void program();
