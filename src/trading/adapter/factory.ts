import { type TradingService } from "../trading-service";
import { createXTBTradingServiceFromEnvironment } from "./xtb";

export enum TradingProvider {
  XTB = "XTB",
}

type Options = {
  provider: TradingProvider;
};

export const createTradingService = async ({ provider }: Options): Promise<TradingService> => {
  switch (provider) {
    case TradingProvider.XTB: {
      return await createXTBTradingServiceFromEnvironment();
    }
  }
};
