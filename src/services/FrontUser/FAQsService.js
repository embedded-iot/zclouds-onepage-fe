import { getFrontUserBaseURL } from 'services/BaseService';
import { cui, makeGetWithConfigs } from 'utils';
import { STATE_VALUES } from 'components/contants';

const transformFAQ = item => {
  return {
    ...item
  }
}
function getFAQs(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getFrontUserBaseURL() + '/faqs';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = !!response ? cui.sortBy(response.map(transformFAQ), 'displayOrder') : [];
    return {
      items: items,
    };
  });
}

function getActivatedFAQs(FAQs = []) {
  return FAQs.filter(faq => faq.state === STATE_VALUES.ACTIVATED);
}

export {
  getFAQs,
  getActivatedFAQs,
}
