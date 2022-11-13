const getBaseURL = () => {
  return process.env.REACT_APP_API + '/api/v1';
}

const getFrontUserUrl = () => {
  return process.env.REACT_APP_FE;
}

const getFrontUserBaseURL = () => {
  return getBaseURL() + '/public';
}

const getSellerBaseURL = () => {
  return getBaseURL() + '/reseller';
}

const getAdminBaseURL = () => {
  return getBaseURL() + '/admin';
}

export {
  getFrontUserUrl,
  getBaseURL,
  getFrontUserBaseURL,
  getSellerBaseURL,
  getAdminBaseURL,
}
