/* eslint-disable node/no-process-exit */
export const runAsyncTask = (task: () => Promise<unknown>) => {
  void task()
    .then(() => process.exit())
    .catch(() => process.exit(1));
};
