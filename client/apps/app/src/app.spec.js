import TFGApp from './app';
describe('App', function() {
	it('should define tfg-app', () => {
        expect(customElements.get('tfg-app')).toBe(TFGApp);
    });
});