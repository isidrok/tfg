Feature('home');

Scenario('Enter home page', (I) => {
    I.amOnPage('/');
    I.see('TFG Bank', {shadow: ['tfg-app', 'tfg-app-layout', 'tgf-app-header', 'h1']});
}).tag('@smoke').tag('@app');
