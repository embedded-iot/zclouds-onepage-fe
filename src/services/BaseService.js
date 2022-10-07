const getBaseURL = () => {
  if (process.env.NODE_ENV !== 'production') {
    return '/api';
  }
  return process.env.REACT_APP_API;
}

export {
  getBaseURL,
}
