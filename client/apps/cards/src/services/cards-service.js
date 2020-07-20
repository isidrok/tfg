import {HTTPService} from '@tfg-core/http';

class CardsService extends HTTPService {
  get config() {
    return this.extendedConfig(super.config, {
      baseURL: 'http://localhost:3000/cards',
    });
  }
}

export const cardsService = new CardsService();
