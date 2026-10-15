import { appConfig } from './app.config';

describe('appConfig', () => {
  it('debería definir los providers del microfrontend', () => {
    expect(appConfig.providers.length).toBeGreaterThan(0);
  });
});
