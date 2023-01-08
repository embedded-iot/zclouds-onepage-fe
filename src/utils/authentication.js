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

  setPermissions(permissions = []) {
    this.permissions = permissions;
  }

  getPermission(permissionKey = '') {
    return (this.permissions || []).includes(permissionKey);
  }
}

const authentication = new Authentication();

export default authentication;
