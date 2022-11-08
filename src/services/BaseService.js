const getBaseURL = () => {
  return '/api1/v2';
}

const getFrontUserBaseURL = () => {
  return getBaseURL() + '/front-user';
}

const getSellerBaseURL = () => {
  return getBaseURL() + '/front-user';
}

const getAdminBaseURL = () => {
  return getBaseURL() + '/front-user';
}

export {
  getBaseURL,
  getFrontUserBaseURL,
  getSellerBaseURL,
  getAdminBaseURL,
}
