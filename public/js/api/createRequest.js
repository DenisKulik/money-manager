'use strict';

const createRequest = (options = {}) => {
  const { data, method, callback } = options;
  let url = options.url;

  let xhr = new XMLHttpRequest();
  let formData;

  if (data) {
    if (Object.keys(data).length != 0 && method === 'GET') {
      url += '?';
      Object.entries(data).forEach(([key, value]) => {
        url += `${key}=${value}&`;
      });
      url = url.slice(0, -1);
    } else if (Object.keys(data).length != 0) {
      formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
  }

  try {
    xhr.open(method, url);
    xhr.responseType = options.responseType
      ? options.responseType
      : 'json';
    xhr.withCredentials = true;
    method === 'GET' ? xhr.send() : xhr.send(formData);
  } catch (e) {
    callback(e);
  }

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState == this.DONE && this.status == 200) {
      callback(null, this.response);
    }
  });
};
