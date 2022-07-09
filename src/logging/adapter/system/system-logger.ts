/* eslint-disable no-console */
import { type Logger } from "../../logger";

export class SystemLogger implements Logger {
  public async info(message: string): Promise<void> {
    console.log(message);
  }
}
