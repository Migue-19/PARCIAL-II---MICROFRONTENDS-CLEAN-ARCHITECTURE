import { appConfig } from './app.config';

describe('appConfig del host', () => {
  it('debería definir los providers de la aplicación', () => {
    expect(appConfig.providers.length).toBeGreaterThan(0);
  });
});
