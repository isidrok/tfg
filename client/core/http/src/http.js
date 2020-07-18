import superAgent from 'superagent/dist/superagent';

export class HTTPService {
  get config() {
    return {
      baseURL: '',
      headers: {},
      query: {},
      timeout: 0,
      parser: (res) => res.body,
    };
  }
  extendedConfig(baseConfig, config) {
    const newConfig = Object.assign({}, baseConfig, config);
    newConfig.baseURL = (baseConfig.baseURL || '') + config.baseURL;
    return newConfig;
  }
  getAll(options = {}) {
    return this.request({
      method: 'GET',
      ...options,
    });
  }
  get(id, query, options = {}) {
    return this.request({
      method: 'GET',
      url: id,
      query,
      ...options,
    });
  }
  post(body, options = {}) {
    return this.request({
      method: 'POST',
      body,
      ...options,
    });
  }
  put(id, body, options = {}) {
    return this.request({
      method: 'PUT',
      url: id,
      body,
      ...options,
    });
  }
  patch(id, body, options = {}) {
    return this.request({
      method: 'PATCH',
      url: id,
      body,
      ...options,
    });
  }
  delete(id, options = {}) {
    return this.request({
      method: 'DELETE',
      url: id,
      ...options,
    });
  }
  request(options) {
    const config = this.config;
    const {
      method = 'GET',
      url = '',
      body,
      query = {},
      headers = {},
      timeout = config.tiemout,
      parser = config.parser,
    } = options;
    return superAgent(method, config.baseURL + '/' + url)
      .set({...config.headers, ...headers})
      .query({...config.query, query})
      .send(body)
      .timeout(timeout)
      .then(parser);
  }
}
