import { num, str, url } from "envalid";

import { loadEnvironment } from "../../../utils/environment";
import { type TradingService } from "../../trading-service";
import { XTBTradingService } from "./xtb-trading-service";

const DEFAULT_XTB_HOST = "ws.xtb.com";
const DEFAULT_TIMEOUT_MS = 10_000;

export const createXTBTradingServiceFromEnvironment = async (): Promise<TradingService> => {
  const environment = loadEnvironment({
    OPERATION_TIMEOUT_MS: num({ default: DEFAULT_TIMEOUT_MS }),
    XTB_ACCOUNT_ID: str(),
    XTB_ACCOUNT_PASSWORD: str(),
    XTB_ACCOUNT_TYPE: str({ choices: ["real", "demo"] }),
    XTB_HOST: url({ default: DEFAULT_XTB_HOST }),
  });

  return await XTBTradingService.create({
    accountId: environment.XTB_ACCOUNT_ID,
    accountPassword: environment.XTB_ACCOUNT_PASSWORD,
    accountType: environment.XTB_ACCOUNT_TYPE,
    operationTimeoutMs: environment.OPERATION_TIMEOUT_MS,
    xtbHost: environment.XTB_HOST,
  });
};
