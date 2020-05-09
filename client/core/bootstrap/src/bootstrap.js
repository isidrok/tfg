import 'systemjs/dist/system';
const { System } = window; 

async function bootstrap() {
    await Promise.all([
        System.import('@tfg-style/base'),
        System.import('@tfg-style/styleguide'),
        System.import('@tfg-apps/app'),
    ]);
}

bootstrap();