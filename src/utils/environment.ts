import { config } from "dotenv";
import { type ValidatorSpec, cleanEnv } from "envalid";

type EnvironmentSpec<T> = {
  [K in keyof T]: ValidatorSpec<T[K]>;
};

export const loadEnvironment = <T>(spec: EnvironmentSpec<T>): T => {
  config();
  // eslint-disable-next-line node/no-process-env
  return cleanEnv(process.env, spec);
};
