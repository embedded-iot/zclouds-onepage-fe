import { getAdminBaseURL, getFrontUserUrl, getSellerBaseURL } from 'services/BaseService';
import { makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import shirt_sku from 'images/t-shirt_sku.svg';
import { DESIGN_DETAIL_TYPE_VALUES } from 'components/contants';

const transformDesign = item => {
  const mockup = item.designDetails && item.designDetails.filter(designDetail => designDetail.type === DESIGN_DETAIL_TYPE_VALUES.MOCKUP)
    .map(design => getFrontUserUrl() + design.url);
  const design = item.designDetails && item.designDetails.filter(designDetail => designDetail.type === DESIGN_DETAIL_TYPE_VALUES.MOCKUP)
    .map(design => getFrontUserUrl() + design.url);
  return {
    ...item,
    name: item.slug,
    mockup: mockup || [shirt_sku],
    design: design || [shirt_sku] ,
  }
}

function getDesigns(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getSellerBaseURL() + '/designs';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformDesign)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

function createDesign(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/designs';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateDesign(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/designs/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function deleteDesign(id, successCallback, failureCallback) {
  const url = getSellerBaseURL() + '/designs/' + id;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}

function downloadDesign(id, successCallback, failureCallback) {
  const url = getSellerBaseURL() + '/designs/' + id + '/download';
  makeGetWithConfigs(url, {}, successCallback, failureCallback, response => {
    return {
      url: getFrontUserUrl() + response.url,
    }
  });
}

function importDesigns(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/designs/import';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function getDesignDetailImageUrl(designId, type) {
  return getAdminBaseURL() + '/designs/' + designId + '/details?type=' + type;
}

function deleteProductImage(designId, designDetailId, successCallback, failureCallback) {
  const url = getAdminBaseURL() + '/designs/' + designId + '/details/' + designDetailId;
  makeDeleteWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getDesigns,
  createDesign,
  updateDesign,
  deleteDesign,
  downloadDesign,
  importDesigns,
  getDesignDetailImageUrl,
  deleteProductImage,
}
