class Account extends Entity {
  static URL = '/account';

  static get(id = '', callback) {
    createRequest({
      method: 'GET',
      url: this.URL + '/' + id,
      responseType: 'json',
      callback,
    });
  }
}
