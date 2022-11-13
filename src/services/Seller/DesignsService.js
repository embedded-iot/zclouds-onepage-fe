import { getSellerBaseURL } from 'services/BaseService';
import { makeDeleteWithConfigs, makeGetWithConfigs, makePostWithConfigs, makePutWithConfigs } from 'utils';
import shirt_sku from 'images/t-shirt_sku.svg';

const transformDesign = item => {
  return {
    ...item,
    mockup: item.mockup || [shirt_sku] ,
    design: item.design || [shirt_sku] ,
  }
}

function getDesigns(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getSellerBaseURL() + '/designs';
  makeGetWithConfigs(url, config, successCallback, error => {
    successCallback({
      items: [{"id": 1, "name":"asdas","type":"2D","mock":["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"],"design":["https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"]}],
      totalCount: 1,
    });
    failureCallback();
  }, response => {
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

function downloadDesign(url, successCallback, failureCallback) {

}

function importDesigns(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/designs/import';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

export {
  getDesigns,
  createDesign,
  updateDesign,
  deleteDesign,
  downloadDesign,
  importDesigns,
}
