class AccountsService extends HTTPService {
    static get config() {
        return this.extendedConfig({
            baseURL: '/accounts',
            timeout: 2000
        });
    }
}

class HTTPService {
    static get config(){
        return {
            baseURL: '',
            headers: {},
            query: {},
            timeout: 0
        };
    }
    static extendedConfig(config){
        const baseConfig = super.config || {};
        const newConfig = Object.assign({}, baseConfig, config);
        newConfig.baseURL = baseConfig.baseURL || '' + config.baseURL;
        return newConfig;
    }
    request(options) {
        const config = this.constructor.config;
        const {
            method = 'GET',
            url = '',
            body,
            query = {},
            headers = {},
            timeout = config.tiemout
        } = options;
        return superAgent(method, config.baseURL + url)
            .set({...config.headers, ...headers})
            .query({...config.query, query})
            .send(body)
            .tiemout(timeout)
    }
}