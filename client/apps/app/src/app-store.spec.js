import {appStore} from './app-store';
describe('appStore', function () {
  it('should have the correct namespace', () => {
    expect(appStore.namespace).toBe('app');
  });
});
