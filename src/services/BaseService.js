const getBaseURL = () => {
  return process.env.REACT_APP_API + '/api/v1';
}

const getFrontUserUrl = () => {
  return process.env.REACT_APP_FE;
}

const getSellerUrl = () => {
  return process.env.REACT_APP_SELLER_FE;
}

const getAdminUrl = () => {
  return process.env.REACT_APP_ADMIN_FE;
}

const getFrontUserBaseURL = () => {
  return getBaseURL() + '/public';
}

const getSellerBaseURL = () => {
  return getBaseURL() + '/seller';
}

const getAdminBaseURL = () => {
  return getBaseURL() + '/admin';
}

const getErrorMessage = (error, defaultMessage) => {
  const message = !!error && !!error.errors && Object.entries(error.errors).map(([key, value]) => `[${key.toUpperCase()}]: ${value}`).join(',');
  if (!!message) {
    return message;
  }
  if (!!error && error.message ) {
    return error.message;
  }
  return defaultMessage;
}

const getFullPathImage = (imageUrl = '') => !!imageUrl && !imageUrl.startsWith('http') ? (getFrontUserUrl() + imageUrl) : imageUrl;
const getShortPathImage = (imageUrl = '') => !!imageUrl && imageUrl.startsWith(getFrontUserUrl()) ? imageUrl.replace(getFrontUserUrl(),'') : imageUrl;

const filterListByPermission = (list = [], filterKey = 'permission') => {
  return list.filter(item => item[filterKey] === undefined || item[filterKey] === true);
}

export {
  getFrontUserUrl,
  getSellerUrl,
  getAdminUrl,
  getFullPathImage,
  getShortPathImage,
  getBaseURL,
  getFrontUserBaseURL,
  getSellerBaseURL,
  getAdminBaseURL,
  getErrorMessage,
  filterListByPermission,
}
