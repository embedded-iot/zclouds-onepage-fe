const productsResponse = {
  data: {
    products: [
      {
        name: "Dịch vụ youtube",
        type: "youtube",
        services: [
          {
            name: "Tăng view, giờ xem YT",
            description: "Tăng hàng ngàn lượt xem Youtube 1 cú Click",
            price: 50,
          },
          {
            name: "Tăng like Youtube",
            description: "Tăng hàng ngàn lượt like Youtube, kênh chất hơn ",
            price: 20,
          },
          {
            name: "Tăng comment Youtube",
            description: "Tăng comment bình luận cho youtube, seeding video",
            price: 10,
          },
          {
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
