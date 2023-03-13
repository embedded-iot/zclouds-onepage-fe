import { getFullPathImage, getSellerBaseURL } from 'services/BaseService';
import {
  cui,
  datetime,
  makeGetWithConfigs,
  makePostWithConfigs,
  makePutWithConfigs,
} from 'utils';
import productImage from 'images/product_ex_icon.png';
import { DATE_FORMAT, STATE_LABELS, STATE_VALUES } from 'components/contants';

const transformProduct = item => {
  const featureImage = item.images && item.images.length ? getFullPathImage(item.images[0].url) : productImage;
  return {
    ...item,
    featureImage: featureImage,
    convertedUpdatedDate: !!item.updatedAt ? datetime.convert(item.updatedAt, DATE_FORMAT) : '',
  }
}
//
// const products = [];
//
// for (let i = 0; i < 4; i++) {
//   products.push(transformProduct({
//     "createdAt": "2023-03-06T14:46:47.050038+00:00",
//     "id": i,
//     "labelId": null,
//     "description": "",
//     "shippingRules": null,
//     "merchantId": 48,
//     "updatedAt": "2023-03-06T14:46:47.050048+00:00",
//     "title": "Garmin Forerunner 245",
//     "supportEmail": "support@kiemnx.plusplus.vn",
//     "images1": [
//       {
//         "url": "https://static.wtecdn.net/files/33b3b338b9f3a040d3844aea2abd673d/prod.png",
//         "id": 1
//       },
//       {
//         "url": "https://static.wtecdn.net/files/6294fd8fa1f8d4f63cf5dba78516606a/download.jpg",
//         "id": 2
//       }
//     ],
//     "adminVisibleStatus": "VISIBLE"
//   }))
// }

function getProducts(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getSellerBaseURL() + '/products';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformProduct)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

function createProduct(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/products';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function updateProduct(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/products/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function getProductDetail(productId, successCallback, failureCallback) {
  const url = getSellerBaseURL() + '/products/' + productId;
  makeGetWithConfigs(url, {}, successCallback, failureCallback, transformProduct);
}


function getProductsOptions(products, isHasDefaultOption = true) {
  return [
    ...(isHasDefaultOption ? [{ label: 'Select product', value: '' }] : []),
    ...(products.map(product => ({...product, label: product.name, value: product.id })))
  ]
}

const getVariantOption = (option = {}) => {
  return {
    id: 0,
    image: '',
    defaultPrice: 0,
    comparedPrice: 0,
    productCost: 0,
    fulfillmentCost: 0,
    options: [],
    sku: '',
    ...option
  }
}

function generateVariantsFromOptions(options = []) {
  const validOptions = options.filter(option => !!option.name && option.value.length);

  const optionList = validOptions.map((option, optionIndex) => option.value.map((optionValue, optionValueIndex) => ({
    id: optionValueIndex + 1,
    name: option.name,
    value: optionValue,
  })));
  const variants = [];
  optionList.length && cui.detectCombinations(optionList, variants);
  return variants.map((variant, index) => (getVariantOption({
    id: index,
    options: variant,
  })));
}


function generateOptionValuesSelectFromOptions(options = []) {
  let optionValues = [];
  options.forEach(option => {
    optionValues = optionValues.concat(option.value);
  })
  return optionValues.map((optionValue, index) => ({
    label: optionValue,
    value: false
  }));
}

const transformProductPage = item => {
  const featureImage = item.images && item.images.length ? getFullPathImage(item.images[0].url) : productImage;
  return {
    ...item,
    featureImage: featureImage,
    isPublished: item.status === STATE_VALUES.ENABLE,
    convertedStatus: STATE_LABELS[item.status === STATE_VALUES.ENABLE ? STATE_VALUES.PUBLISHED : STATE_VALUES.DRAFT],
    convertedUpdatedDate: !!item.updatedAt ? datetime.convert(item.updatedAt, DATE_FORMAT) : '',
  }
}


const productPages = [];

const getProductPageItem = (i) => (
  {
    "updatedAt": "2023-03-09T01:54:31.281103+00:00",
    "shipping": null,
    "description": "",
    "fixedAmountSellessFee": 0,
    "title": "T Shirt sale",
    "taxes": null,
    "shortDescription": null,
    "disputeRate": 0,
    "code": "HOT_PRODUCT_1678326871.2786317",
    "returns": null,
    "percentageSellessFee": 0,
    "topDescription": null,
    "previewLink": null,
    "payload": null,
    "footerHtml": null,
    "middleDescription": null,
    "productId": 5735,
    "images": [
      {
        "id": 1,
        "url": "https://static.wtecdn.net/files/f2f54d0ffc782765b6a8e55d0d8bc3cf/unnamed.jpg"
      }
    ],
    "status": i % 2 === 0 ? "DISABLE" : "ENABLE",
    "id": 6695,
    "bottomDescription": null,
    "optionMapping": null,
    "variants": null,
    "isSale": null,
    "createdAt": "2023-03-09T01:54:31.281091+00:00",
    "metaDescription": null,
    "merchantId": 48,
    "reviews": null,
    "publishScope": "ALL_PUBLISHERS",
    "shippingRules": null,
    "supportEmail": "support@kiemnx.plusplus.vn",
    "labelId": null
  }
)

for (let i = 0; i < 4; i++) {
  productPages.push(transformProductPage(getProductPageItem(i)))
}

function getProductPages(id, params, successCallback, failureCallback) {
  const config = {
    params
  };
  successCallback({
    items: productPages,
    totalCount: productPages.length,
  });
  const url = getSellerBaseURL() + '/products/' + id + '/product_pages';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformProduct)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

function createProductPages(id, successCallback, failureCallback) {
  successCallback(transformProductPage(getProductPageItem(0)));
  const url = getSellerBaseURL() + '/products/' + id + '/product_pages';
  makePostWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getProducts,
  getProductDetail,
  createProduct,
  updateProduct,
  getVariantOption,
  generateVariantsFromOptions,
  generateOptionValuesSelectFromOptions,
  getProductsOptions,
  getProductPages,
  createProductPages,
}
