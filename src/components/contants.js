export const WEBSITE_NAME = 'LIKE68';
export const WEBSITE_DOMAIN = 'Like68.vn';
export const ROUTERS = {
  ROOT: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_ACCOUNT: '/forgot-account',
  LOGOUT: '/logout',
  ACCOUNT_INFO: '/account-info',
  SERVICES: `/services`,
  DETAIL_SERVICE: `/services/:productType/:serviceId/:serviceName`,
  ACCOUNT_ASSETS: '/account-assets/:tab',
  ACCOUNT_ASSETS_INVOICES_HISTORY: '/account-assets/deposits-history',
  ACCOUNT_ASSETS_INVOICES_METHODS: '/account-assets/deposit-methods',
  ACCOUNT_ASSETS_ORDERS_HISTORY: '/account-assets/orders-history',
  INVOICES_HISTORY: '/deposits-history',
  ORDERS_HISTORY: '/orders-history',
  PRICES: '/prices',
  PRICES_FOR_PARTNER: '/prices-for-partner',
  FIND_FACEBOOK_ID: '/find-facebook-id',
  MAKE_MONEY: '/make-money',
  NOTIFICATION: '/notification',
  FB_PAGE: '/fb-page',
  FB_ADMIN: '/fb-admin',
  CONTACT_INFO: '/contact-info',
  POSTS: '/posts',
  DETAIL_POSTS: '/posts/:postKey/:postName',
}

export const ORDER_STATUS = {
  REQUESTED: 'REQUESTED',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
  REJECTED: 'REJECTED',
  CANCELED: 'CANCELED',
};

export const ORDER_STATUS_LABEL = {
  [ORDER_STATUS.REQUESTED]: 'Đã gửi yêu cầu',
  [ORDER_STATUS.IN_PROGRESS]: 'Đang xử lý...',
  [ORDER_STATUS.DONE]: 'Hoàn thành',
  [ORDER_STATUS.REJECTED]: 'Đã từ chối',
  [ORDER_STATUS.CANCELED]: 'Đã hủy',
}


export const ORDER_STATUS_OPTIONS = [
  { label: ORDER_STATUS_LABEL[ORDER_STATUS.REQUESTED], value: ORDER_STATUS.REQUESTED },
  { label: ORDER_STATUS_LABEL[ORDER_STATUS.IN_PROGRESS], value: ORDER_STATUS.IN_PROGRESS },
  { label: ORDER_STATUS_LABEL[ORDER_STATUS.DONE], value: ORDER_STATUS.DONE },
  { label: ORDER_STATUS_LABEL[ORDER_STATUS.REJECTED], value: ORDER_STATUS.REJECTED },
  { label: ORDER_STATUS_LABEL[ORDER_STATUS.CANCELED], value: ORDER_STATUS.CANCELED },
];

export const PRODUCT_TYPES = {
  YOUTUBE: 'YOUTUBE',
  TIKTOK: 'TIKTOK',
  SHOPPE: 'SHOPPE',
};

export const ACTIVE_PRODUCT_TYPES = [
  PRODUCT_TYPES.YOUTUBE,
  // PRODUCT_TYPES.TIKTOK,
  // PRODUCT_TYPES.SHOPPE,
];

export const INVOICE_LABELS = {
  TOP_UP: 'Nạp tiền',
  DEDUCT: 'Rút tiền',
  REFUND : 'Hoàn tiền',
};

export const POST_KEYS = {
  BUFF_FB_LIKE: 'buff-fb-like',
  UNLOCK_FB_ACC: 'unlock-fb-acc',
  HOTLINE_FB_VN: 'hotline-fb-vn',
  ICON_FB_2020: 'icon-fb-2020',
  VERIFY_FB_ACC: 'verify-fb-acc',
};

export const DATETIME_FORMAT = "DD/MM/YYYY HH:MM";
