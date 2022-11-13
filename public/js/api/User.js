class User {
  static URL = '/user';

  static setCurrent(user) {
    this.user = JSON.stringify(user);
    localStorage.setItem('user', this.user);
  }

  static current() {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return;
    }
  }

  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  static fetch(callback) {
    createRequest({
      method: 'GET',
      url: this.URL + '/current',
      responseType: 'json',
      callback: (err, response) => {
        if (response.success && response.user) {
          this.setCurrent(response.user);
        } else {
          this.unsetCurrent();
        }
        callback(err, response);
      },
    });
  }

  static register(data, callback) {
    createRequest({
      method: 'POST',
      url: this.URL + '/register',
      data,
      responseType: 'json',
      callback: (err, response) => {
        if (response.success && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      },
    });
  }

  static login(data, callback) {
    createRequest({
      method: 'POST',
      url: this.URL + '/login',
      data,
      responseType: 'json',
      callback: (err, response) => {
        if (response.success && response.user) {
          this.setCurrent(response.user);
        }
        callback(err, response);
      },
    });
  }

  static logout(callback) {
    createRequest({
      method: 'POST',
      url: this.URL + '/logout',
      responseType: 'json',
      callback: (err, response) => {
        if (response.success) {
          this.unsetCurrent();
        }
        callback(err, response);
      },
    });
  }
}
