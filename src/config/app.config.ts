import { GlobalVariable } from './global.variable';

export const AppConfig = {
  port: Number(GlobalVariable.env.API_PORT),
};

export interface IAppConfig {
  port: number;
}
