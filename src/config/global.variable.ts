import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { Singleton } from 'tstl';
import typia from 'typia';

export class GlobalVariable {
  public static testing: boolean = false;

  public static get env(): IEnvironments {
    return environments.get();
  }

  public static get mode(): IMode['value'] {
    return (modeWrapper.value ??= environments.get().MODE);
  }

  public static setMode(mode: typeof GlobalVariable.mode): void {
    typia.assert<typeof mode>(mode);
    modeWrapper.value = mode;
  }
}
interface IEnvironments {
  MODE: IMode['value'];
  API_PORT: string;
  CACHE_TTL_MS: string;
}

interface IMode {
  value?: 'local' | 'development' | 'production';
}

const modeWrapper: IMode = {};

const environments = new Singleton(() => {
  const env = dotenv.config();
  dotenvExpand.expand(env);
  return typia.assert<IEnvironments>(process.env);
});
