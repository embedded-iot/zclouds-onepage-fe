export const WEBSITE_NAME = 'Fulfil';
export const WEBSITE_DOMAIN = 'Fulfil.com';
export const ROUTERS = {
  ROOT: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  FRONT_USER_REGISTER: '/register',
  FRONT_USER_ALL_PRODUCTS: '/categories',
  FRONT_USER_SKU: '/sku',
  SELLER_ORDERS: '/orders',
  SELLER_DESIGN_LIBRARY: '/design-library',
  SELLER_MY_ACCOUNT: '/my-account',
  SELLER_STORES: '/stores',
  SELLER_WALLET: '/wallet',
  SELLER_INTEGRATIONS: '/integration',
  SELLER_PRODUCT_CATEGORY: '/product-category',
  SELLER_TICKETS: '/tickets',
  SELLER_CHAT_WITH_ME: '/chat-with-me',
  SELLER_CREATOR_COMMUNITY: '/creator-community',
  ADMIN_PRODUCTS_MANAGEMENT: '/products-management',
  ADMIN_ADMINS_AND_ROLES_MANAGEMENT: '/admins-and-roles-management',
  ADMIN_ADMINS_MANAGEMENT: '/admins-management',
  ADMIN_ROLES_MANAGEMENT: '/roles-management',
}

export const SHIPPING_EXPRESSES = {
  YUN_EXPRESS: 'Yun Express',
  YUN_FAST: 'Funfast',
  FED_EX: 'FedEx',
  DHL: 'DHL',
};

export const SHIPPING_EXPRESSES_VALUES_OPTIONS = [
  SHIPPING_EXPRESSES.YUN_EXPRESS,
  SHIPPING_EXPRESSES.YUN_FAST,
  SHIPPING_EXPRESSES.FED_EX,
  SHIPPING_EXPRESSES.DHL,
]


export const SHIPPING_EXPRESSES_LABEL_VALUE_OPTIONS = [
  { label: SHIPPING_EXPRESSES.YUN_EXPRESS, value: SHIPPING_EXPRESSES.YUN_EXPRESS },
  { label: SHIPPING_EXPRESSES.YUN_FAST, value: SHIPPING_EXPRESSES.YUN_FAST },
  { label: SHIPPING_EXPRESSES.FED_EX, value: SHIPPING_EXPRESSES.FED_EX },
  { label: SHIPPING_EXPRESSES.DHL, value: SHIPPING_EXPRESSES.DHL },
];


export const SIZES = {
  _S: 'S',
  _M: 'M',
  _L: 'L',
  _XL: 'XL',
  _2XL: '2XL',
};

export const SIZES_VALUES_OPTIONS = [
  SIZES._S,
  SIZES._M,
  SIZES._L,
  SIZES._XL,
  SIZES._2XL,
]

export const SIZES_LABEL_VALUE_OPTIONS = [
  { label: SIZES._S, value: SIZES._S },
  { label: SIZES._M, value: SIZES._M },
  { label: SIZES._L, value: SIZES._L },
  { label: SIZES._XL, value: SIZES._XL },
  { label: SIZES._2XL, value: SIZES._2XL },
];

export const DATETIME_FORMAT = "DD/MM/YYYY HH:MM";

export const RESPONSIVE_MEDIAS = {
  MOBILE: { query: '(max-width: 768px)' },
  TABLET: { query: '(max-width: 1124px)' },
  DESKTOP: { query: '(max-width: 4096px)' },
}
