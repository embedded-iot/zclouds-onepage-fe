class Authentication {
  setToken(accessToken = '') {
    localStorage.setItem('accessToken', accessToken);
  }

  getToken() {
    return localStorage.getItem('accessToken');
  }

  clearToken() {
    localStorage.removeItem('accessToken');
  }
}

const authentication = new Authentication();

export default authentication;
