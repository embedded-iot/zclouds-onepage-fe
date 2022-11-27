import { getAdminBaseURL, getFrontUserUrl, getSellerBaseURL } from 'services/BaseService';
import { makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs } from 'utils';
import shirt_sku from 'images/t-shirt_sku.svg';
import { DESIGN_DETAIL_TYPE_VALUES } from 'components/contants';

const transformDesign = item => {
  const mockup = item.designDetails && item.designDetails.filter(designDetail => designDetail.type === DESIGN_DETAIL_TYPE_VALUES.MOCKUP)
    .map(design => getFrontUserUrl() + design.url);
  const design = item.designDetails && item.designDetails.filter(designDetail => designDetail.type === DESIGN_DETAIL_TYPE_VALUES.DESIGN)
    .map(design => getFrontUserUrl() + design.url);
  return {
    ...item,
    name: item.slug,
    mockup: mockup.length ? mockup : [shirt_sku],
    design: design.length ? design : [shirt_sku] ,
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

function getDesignsOptions(designs, isHasDefaultOption = true) {

  return [
    ...(isHasDefaultOption ? [{ label: 'Select design', value: '' }] : []),
    ...(designs.map(design => {
      const convertedDesignUrl = !!design.design && !!design.design.length && (getFrontUserUrl() + design.design[0]);
      const convertedMockupUrl = !!design.mockup && !!design.mockup.length && (getFrontUserUrl() + design.mockup[0]);
      return ({ ...design, label: design.name, value: design.id, convertedDesignUrl, convertedMockupUrl });
    }))
  ]
}

export {
  getDesigns,
  createDesign,
  deleteDesign,
  downloadDesign,
  importDesigns,
  getDesignDetailImageUrl,
  deleteProductImage,
  getDesignsOptions,
}
