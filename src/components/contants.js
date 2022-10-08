export const WEBSITE_NAME = 'LIKE68';
export const WEBSITE_DOMAIN = 'like68.vn';
export const ROUTERS = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_ACCOUNT: '/forgot-account',
  LOGOUT: '/logout',
  ACCOUNT_INFO: '/account-info',
  SERVICES: `/services`,
  DETAIL_SERVICE: `/services/:serviceKey/:serviceName`,
  ACCOUNT_ASSETS: '/account-assets/:tab',
  ACCOUNT_ASSETS_DEPOSITS_HISTORY: '/account-assets/deposits-history',
  ACCOUNT_ASSETS_DEPOSIT_METHODS: '/account-assets/deposit-methods',
  ACCOUNT_ASSETS_ORDERS_HISTORY: '/account-assets/orders-history',
  DEPOSITS_HISTORY: '/deposits-history',
  ORDERS_HISTORY: '/orders-history',
  PRICES: '/prices',
  PRICES_FOR_PARTNER: '/prices-for-partner',
  FIND_FACEBOOK_ID: '/find-facebook-id',
  MAKE_MONEY: '/make-money',
  NOTIFICATION: '/notification',
  FB_PAGE: '/fb-page',
  FB_ADMIN: '/fb-admin',
  CONTACT_INFO: '/contact-info',
  BUFF_FB_LIKE: '/buff-fb-like',
  UNLOCK_FB_ACC: '/unlock-fb-acc',
  HOTLINE_FB_VN: '/hotline-fb-vn',
  ICON_FB_2020: '/icon-fb-2020',
  VERIFY_FB_ACC: '/verify-fb-acc',
}

export const ORDER_STATUS = [
  { value: 'Hoàn thành' },
  { value: 'Hủy' },
  { value: 'Yêu cầu Hủy' },
  { value: 'Tạm dừng' },
  { value: 'Chờ hoàn tiền' },
  { value: 'Đã hoàn tiền' },
  { value: 'Tăng một phần' },
  { value: 'Lên lịch' },
  { value: 'Đang kiểm tra' },
  { value: 'Đang xử lý...' },
  { value: 'Đợi chạy' },
  { value: 'Đang chạy' },
];

export const SERVICE_KEYS = {
  'VIEW_YOUTUBE' : 'view-youtube',
  'LIKE_YOUTUBE' : 'like-youtube',
  'COMMENT_YOUTUBE' : 'comment-youtube',
  'SUB_YOUTUBE' : 'sub-youtube',
};
