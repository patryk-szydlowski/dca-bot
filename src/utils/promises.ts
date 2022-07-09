export const timeout = <T>(task: Promise<T>, timeoutMs: number) =>
  Promise.race([task, delayedTimeout<T>(timeoutMs)]);

const delayedTimeout = <T>(timeoutMs: number) =>
  new Promise<T>((_resolve, reject) => {
    setTimeout(() => reject(new Error(`Promise timed out after ${timeoutMs}ms`)), timeoutMs);
  });
