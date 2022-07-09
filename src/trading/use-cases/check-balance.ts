import { type Logger } from "../../logging/logger";
import { type TradingService } from "../trading-service";

type Dependencies = {
  logger: Logger;
  tradingService: TradingService;
};

export const checkBalance = async ({ tradingService, logger }: Dependencies) => {
  const accountBalance = await tradingService.getAccountBalance();
  await logger.info(`Your account has ${accountBalance.availableFunds} available funds`);
};
