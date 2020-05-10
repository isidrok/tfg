Feature('home');

Scenario('test something', (I) => {
    I.amOnPage('/accounts');
    I.see('ES2814657284123818141832');
}).tag('@app').tag('@smoke');
