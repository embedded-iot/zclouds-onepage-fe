import { getFrontUserBaseURL } from 'services/BaseService';
import { makeGetWithConfigs } from 'utils';
import shirt_sku from 'images/t-shirt_sku.svg';


const items = [];

for (let i = 0; i < 20; i++) {
  items.push({
    key: i,
    id: 1450,
    avatar: shirt_sku,
    name: 'Kids\' Sweater 3D',
    price: 28,
    attrs: [
      {
        "ID": 1003,
        "NAME": "Shipping",
        "VALUES": [
          {
            "ATTR_NAME": "Shipping",
            "ID": 6237,
            "SLUG": "yun-express",
            "VALUE": "Yun Express",
            "PRICEADJUSTMENT": 0
          },
          {
            "ATTR_NAME": "Shipping",
            "ID": 6238,
            "SLUG": "yunfast",
            "VALUE": "Yunfast",
            "PRICEADJUSTMENT": 10
          },
          {
            "ATTR_NAME": "Shipping",
            "ID": 6239,
            "SLUG": "fedex",
            "VALUE": "FedEx",
            "PRICEADJUSTMENT": 20
          },
          {
            "ATTR_NAME": "Shipping",
            "ID": 6240,
            "SLUG": "dhl",
            "VALUE": "DHL",
            "PRICEADJUSTMENT": 24
          }
        ]
      },
      {
        "ID": 1004,
        "NAME": "Size",
        "VALUES": [
          {
            "ATTR_NAME": "Size",
            "ID": 6241,
            "SLUG": "s",
            "VALUE": "S",
            "PRICEADJUSTMENT": 0
          },
          {
            "ATTR_NAME": "Size",
            "ID": 6242,
            "SLUG": "m",
            "VALUE": "M",
            "PRICEADJUSTMENT": 0
          },
          {
            "ATTR_NAME": "Size",
            "ID": 6243,
            "SLUG": "l",
            "VALUE": "L",
            "PRICEADJUSTMENT": 0
          },
          {
            "ATTR_NAME": "Size",
            "ID": 6244,
            "SLUG": "xl",
            "VALUE": "XL",
            "PRICEADJUSTMENT": 0
          },
          {
            "ATTR_NAME": "Size",
            "ID": 6245,
            "SLUG": "2xl",
            "VALUE": "2XL",
            "PRICEADJUSTMENT": 0
          }
        ]
      }
    ],
  })
}

const defaultData = {
  items,
  totalCount: 100
}


function getSKUs(params, successCallback, failureCallback) {
  successCallback(defaultData);
  const config = {
    params
  };
  const url = getFrontUserBaseURL() + '/skus';
  makeGetWithConfigs(url, config, successCallback, failureCallback);
}

export {
  getSKUs,
}
