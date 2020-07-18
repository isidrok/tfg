import {HTTPService} from '@tfg-core/http';

class AccountsService extends HTTPService {
  get config() {
    return this.extendedConfig(super.config, {
      baseURL: 'http://localhost:3000/accounts',
    });
  }
}

export const accountsService = new AccountsService();
