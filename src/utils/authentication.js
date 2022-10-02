class Authentication {
  accessToken = '';

  setToken(accessToken = '') {
    this.accessToken = accessToken;
  }

  getToken() {
    return this.accessToken;
  }
}

const authentication = new Authentication();

export default authentication;
