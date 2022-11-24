import { getSellerBaseURL } from 'services/BaseService';
import { datetime, makeGetWithConfigs, makePutWithConfigs } from 'utils';
import { DATE_FORMAT, STORE_TYPE_ICONS, STORE_TYPE_LABELS, STORE_TYPE_VALUES } from 'components/contants';
import Icon from 'components/Common/Icon';

const transformStore = item => {
  return {
    ...item,
    convertedType: STORE_TYPE_LABELS[item.platform.toLowerCase()] || item.type,
    convertedCreatedDate: !!item.createdAt ? datetime.convert(item.createdAt, DATE_FORMAT) : '',
  }
}

function getStores(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getSellerBaseURL() + '/stores';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformStore);
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

function updateStore(id, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getSellerBaseURL() + '/stores/' + id;
  makePutWithConfigs(url, config, successCallback, failureCallback);
}

function getStore(id, successCallback, failureCallback) {
  const url = getSellerBaseURL() + '/stores/' + id;
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

function getStoresOptions(stores) {
  return [
    { label: 'Select store', value: '' },
    ...(stores.map(store => ({ label: store.name, value: store.id })))
  ]
}

function getStoreTypeLabel(type) {
  return (
    <div className="create-new-store-form__type-select">
      <Icon src={STORE_TYPE_ICONS[type]} />
      <span>{STORE_TYPE_LABELS[type]}</span>
    </div>
  )
}

function getStoresTypesOptions() {
  return  [
    { label: getStoreTypeLabel(STORE_TYPE_VALUES.WOO_COMMERCE), value: STORE_TYPE_VALUES.WOO_COMMERCE },
    { label: getStoreTypeLabel(STORE_TYPE_VALUES.SHOP_BASE), value: STORE_TYPE_VALUES.SHOP_BASE },
    { label: getStoreTypeLabel(STORE_TYPE_VALUES.SHOPIFY), value: STORE_TYPE_VALUES.SHOPIFY },
  ];
}

export {
  getStores,
  updateStore,
  getStore,
  getStoresOptions,
  getStoresTypesOptions,
}
