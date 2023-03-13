import { getSellerBaseURL } from 'services/BaseService';
import { makeDeleteWithConfigs } from 'utils';

function uploadImage() {
  return getSellerBaseURL() + '/files/images';
}

function deleteImageByPath(path, successCallback, failureCallback) {
  const config = {
    params: {
      path
    }
  }
  const url = getSellerBaseURL() + '/files/images';
  makeDeleteWithConfigs(url, config, successCallback, failureCallback);
}

export {
  uploadImage,
  deleteImageByPath,
}

