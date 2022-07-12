/* eslint-disable node/no-process-exit,no-console */
export const runAsyncTask = (task: () => Promise<unknown>) => {
  void task()
    .then(() => process.exit())
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
};
