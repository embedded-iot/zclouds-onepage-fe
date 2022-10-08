import { SERVICE_KEYS } from 'components/contants';

const productsResponse = {
  data: {
    products: [
      {
        name: "Dịch vụ youtube",
        type: "youtube",
        services: [
          {
            key: SERVICE_KEYS.VIEW_YOUTUBE,
            name: "Tăng view, giờ xem YT",
            description: "Tăng hàng ngàn lượt xem Youtube 1 cú Click",
            price: 50,
          },
          {
            key: SERVICE_KEYS.LIKE_YOUTUBE,
            name: "Tăng like Youtube",
            description: "Tăng hàng ngàn lượt like Youtube, kênh chất hơn ",
            price: 20,
          },
          {
            key: SERVICE_KEYS.COMMENT_YOUTUBE,
            name: "Tăng comment Youtube",
            description: "Tăng comment bình luận cho youtube, seeding video",
            price: 10,
          },
          {
            key: SERVICE_KEYS.SUB_YOUTUBE,
            name: "Tăng Sub Youtube ",
            description: "Tăng follow, sub cho kênh Youtube",
            price: 40,
          }
        ]
      }
    ]
  }
}

function getProducts(successCallback, failureCallback) {
  successCallback(productsResponse);
}

export {
  getProducts,
}
