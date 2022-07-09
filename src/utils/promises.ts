export const timeout = <T>(timeoutMs: number) =>
  new Promise<T>((_resolve, reject) => {
    setTimeout(() => reject(new Error(`Promise timed out after ${timeoutMs}ms`)), timeoutMs);
  });
