import {HTTPService} from '@tfg-core/http';

class MenuItemsService extends HTTPService {
  get config() {
    return this.extendedConfig(super.config, {
      baseURL: '/menu-items',
    });
  }
}

export const menuItemsService = new MenuItemsService();
