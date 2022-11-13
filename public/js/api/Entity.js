class Entity {
  static URL = '';

  static list(data, callback) {
    createRequest({
      method: 'GET',
      url: this.URL,
      data,
      responseType: 'json',
      callback,
    });
  }

  static create(data, callback) {
    createRequest({
      method: 'PUT',
      url: this.URL,
      data,
      responseType: 'json',
      callback,
    });
  }

  static remove(data, callback) {
    createRequest({
      method: 'DELETE',
      url: this.URL,
      data,
      responseType: 'json',
      callback,
    });
  }
}
