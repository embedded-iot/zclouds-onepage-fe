import { getFrontUserBaseURL } from 'services/BaseService';
import { makeGetWithConfigs } from 'utils';
import { STATE_VALUES } from 'components/contants';

function getSystemConfigs(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getFrontUserBaseURL() + '/system/config';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    return {
      items: response,
    };
  });
}

function getActivatedSystemConfigs(systemConfigs) {
  return systemConfigs.filter(config => config.configStatus === STATE_VALUES.IS_ACTIVE);
}

function getSystemConfigValue(systemConfigs = [], configName) {
  const config = systemConfigs.find(config => config.configName === configName);
  return config ? config.configValue : undefined;
}

export {
  getSystemConfigs,
  getActivatedSystemConfigs,
  getSystemConfigValue,
}
