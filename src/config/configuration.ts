import { AppConfig, IAppConfig } from './app.config';

export interface IConfig {
  port: IAppConfig['port'];
}

export default (): IConfig => ({
  port: AppConfig.port,
});
