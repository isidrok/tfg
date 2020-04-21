import {HTTPService} from '@tfg-core/http';

class AccountsService extends HTTPService {
    get config() {
        return this.extendedConfig(super.config, {
            baseURL: '/accounts'
        });
    }
}

export const accountsService = new AccountsService();