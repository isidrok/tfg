import 'systemjs/dist/system';
const { System } = window; 

async function bootstrap() {
    await Promise.all([
        System.import('@tfg-style/styleguide'),
        System.import('@tfg-style/layout'),
        System.import('@tfg-apps/app'),
    ]);
}

bootstrap();