import {HTTPService} from '@tfg-core/http';

class MenuItemsService extends HTTPService {
  get config() {
    return this.extendedConfig(super.config, {
      baseURL: 'http://localhost:3000/menu-items',
    });
  }
}

export const menuItemsService = new MenuItemsService();
