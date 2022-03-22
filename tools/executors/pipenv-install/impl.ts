import type { ExecutorContext } from '@nrwl/devkit';
import { exec } from 'child_process';
import { promisify } from 'util';

export interface EchoExecutorOptions {
  name: string;
}

/**
 *  Custom executor for testing purposes
 */
export default async function echoExecutor(
  options: EchoExecutorOptions,
  context: ExecutorContext
): Promise<{ success: boolean }> {
  console.info(`Executing pipenv install ${options.name} --skip-lock`);

  const { stdout, stderr } = await promisify(exec)(
    `pipenv install ${options.name} --skip-lock`
  );
  console.log(stdout);
  console.error(stderr);

  const success = !stderr;
  return { success };
}
