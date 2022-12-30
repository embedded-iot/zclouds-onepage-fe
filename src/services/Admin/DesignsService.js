import { getAdminBaseURL, getFullPathImage } from 'services/BaseService';
import { makeGetWithConfigs, makePatchWithConfigs } from 'utils';
import shirt_sku from 'images/t-shirt_sku.svg';
import { DESIGN_DETAIL_TYPE_VALUES, STATE_LABELS, STATE_VALUES } from 'components/contants';

const transformDesign = item => {
  item.state = item.state || STATE_VALUES.ACTIVATED;
  const convertedMockupImages = item.designDetails && item.designDetails.filter(designDetail => designDetail.type === DESIGN_DETAIL_TYPE_VALUES.MOCKUP)
    .map(image => ({
      ...image,
      url: getFullPathImage(image.url),
    }));
  const convertedDesignImages = item.designDetails && item.designDetails.filter(designDetail => designDetail.type === DESIGN_DETAIL_TYPE_VALUES.DESIGN)
    .map(image => ({
      ...image,
      url: getFullPathImage(image.url),
    }));
  return {
    ...item,
    convertedStatus: STATE_LABELS[item.state] || item.state,
    name: item.slug,
    convertedMockupImages: convertedMockupImages || [],
    convertedDesignImages: convertedDesignImages || [],
    mockupFeatureImage: convertedMockupImages.length ? convertedMockupImages[0].url : shirt_sku,
    designFeatureImage: convertedDesignImages.length ? convertedDesignImages[0].url : shirt_sku,
  }
}

const items = [];
for (let i = 0; i < 10; i++) {
  items.push(transformDesign({
    "id": i,
    "slug": "design-test",
    "type": "2D",
    "userId": 4,
    "designDetails": [
      {
        "id": 26,
        "url": "/uploads/designs/19/64b6c280-313e-4c1f-aa12-99b3f8412a48.png",
        "systemPath": "/uploads/designs/19/64b6c280-313e-4c1f-aa12-99b3f8412a48.png",
        "size": 4,
        "displayOrder": 1,
        "type": "MOCKUP",
        "storageType": "FileSystem",
        "designId": 19
      }
    ]
  }))
}

function getDesigns(params, successCallback, failureCallback) {
  successCallback({
    items,
    totalCount: 3
  })
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/designs';
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

function updateDesignStatus(id, params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/designs/' + id + '/state';
  makePatchWithConfigs(url, config, successCallback, failureCallback);
}


function getDesignsOptions(designs, isHasDefaultOption = true) {
  return [
    ...(isHasDefaultOption ? [{ label: 'Select design', value: '' }] : []),
    ...(designs.map(design => {
      const convertedDesignUrl = !!design.convertedDesignImages && !!design.convertedDesignImages.length ? design.convertedDesignImages[0].url : "";
      const convertedMockupUrl = !!design.convertedMockupImages && !!design.convertedMockupImages.length ? design.convertedMockupImages[0].url : "";
      return ({ ...design, label: design.name, value: design.id, convertedDesignUrl, convertedMockupUrl });
    }))
  ]
}

export {
  getDesigns,
  updateDesignStatus,
  getDesignsOptions,
}
