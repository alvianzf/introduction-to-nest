export const APP_CONFIG = 'APP_CONFIG';

export const AppConfig = {
  name: 'Introduction to NestJS',
  version: '1.2 (Day 7)',
  environment: 'development',
  features: {
    useAdvancedDI: true,
  },
};

export const AppConfigProvider = {
  provide: APP_CONFIG,
  useValue: AppConfig,
};
