import { POST_KEYS } from 'components/contants';

const postsResponse = {
  data: {
    posts: [
      {
        key: POST_KEYS.BUFF_FB_LIKE,
        name: "Tăng view, giờ xem YT",
      },
      {
        key: POST_KEYS.UNLOCK_FB_ACC,
        name: "Tăng like Youtube",
      },
      {
        key: POST_KEYS.HOTLINE_FB_VN,
        name: "Tăng comment Youtube",
      },
      {
        key: POST_KEYS.ICON_FB_2020,
        name: "Tăng Sub Youtube ",
      },
      {
        key: POST_KEYS.VERIFY_FB_ACC,
        name: "Tăng Sub Youtube ",
      }
    ]
  }
}

function getPosts(successCallback, failureCallback) {
  successCallback(postsResponse);
}

export {
  getPosts,
}
