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

const getErrorMessage = (error, defaultMessage) => {
  const message = !!error && !!error.errors && Object.entries(error.errors).map(([key, value]) => value).join(',');
  return !!message ? message : defaultMessage;
}

const getFullPathImage = (imageUrl = '') => getFrontUserUrl() + imageUrl;

export {
  getFrontUserUrl,
  getFullPathImage,
  getBaseURL,
  getFrontUserBaseURL,
  getSellerBaseURL,
  getAdminBaseURL,
  getErrorMessage,
}
