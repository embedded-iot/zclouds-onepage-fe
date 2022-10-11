import { POST_KEYS } from 'components/contants';

const postsResponse = {
  posts: [
    {
      key: POST_KEYS.BUFF_FB_LIKE,
      name: "Dịch vụ Tăng like Facebook",
    },
    {
      key: POST_KEYS.UNLOCK_FB_ACC,
      name: "Mở khóa Facebook",
    },
    {
      key: POST_KEYS.HOTLINE_FB_VN,
      name: "Tổng đài Facebook Việt Nam",
    },
    {
      key: POST_KEYS.ICON_FB_2020,
      name: "Icon Facebook 2020",
    },
    {
      key: POST_KEYS.VERIFY_FB_ACC,
      name: "Tích xanh Facebook",
    }
  ]
}

function getPosts(successCallback, failureCallback) {
  successCallback(postsResponse);
}

export {
  getPosts,
}
