import shopifyLogo from 'images/shopify_logo.svg'
import shopBaseLogo from 'images/shopbase_logo.svg'
import wooCommerceLogo from 'images/woocommerce_logo.svg'

export const WEBSITE_NAME = 'Fulfil';
export const WEBSITE_DOMAIN = 'Fulfil.com';
export const ROUTERS = {
  ROOT: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  FRONT_USER_REGISTER: '/register',
  FRONT_USER_ALL_PRODUCTS: '/products',
  FRONT_USER_ALL_PRODUCTS_WITH_CATEGORY: '/products/:categoryName/:categoryId',
  FRONT_USER_PRODUCT_DETAIL: '/products/:categoryName/:productName/:categoryId/:productId',
  FRONT_USER_SKU: '/sku',
  SELLER_ORDERS: '/orders',
  SELLER_DETAIL_ORDER: '/orders/:orderId',
  SELLER_DESIGN_LIBRARY: '/design-library',
  SELLER_MY_ACCOUNT: '/my-account',
  SELLER_STORES: '/stores',
  SELLER_DETAIL_STORE: '/stores/:storeId',
  SELLER_WALLET: '/wallet',
  SELLER_INTEGRATIONS: '/integration',
  SELLER_INTEGRATIONS_WITH_VENDOR: '/integration/:vendorId',
  SELLER_INTEGRATION_ORDERS: '/integration/:vendorId/orders/:storeId/:storeName',
  SELLER_PRODUCT_CATEGORY: '/product-category',
  SELLER_TICKETS: '/tickets',
  SELLER_CHAT_WITH_ME: '/chat-with-me',
  SELLER_CREATOR_COMMUNITY: '/creator-community',
  ADMIN_PRODUCTS_MANAGEMENT: '/products-management',
  ADMIN_CATEGORIES_MANAGEMENT: '/categories-management',
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
export const DATE_FORMAT = "DD/MM/YYYY";

export const RESPONSIVE_MEDIAS = {
  MOBILE: { query: '(max-width: 768px)' },
  TABLET: { query: '(max-width: 1124px)' },
  DESKTOP: { query: '(max-width: 4096px)' },
}

export const STATE_VALUES = {
  ACTIVATED: 'ACTIVATED',
  BLOCKED: 'BLOCKED',
  PENDING: 'PENDING',
  PROCESS: 'PROCESS',
  FULFILLED: 'FULFILLED',
  CANCELED : 'CANCELED',
  UPDATING : 'UPDATING',
  PICKED : 'PICKED',
  REFUND : 'REFUND',
  HOLD : 'HOLD',
  RESEND : 'RESEND',
};

export const STATE_LABELS = {
  [STATE_VALUES.ACTIVATED]: 'Activated',
  [STATE_VALUES.BLOCKED]: 'No Active',
  [STATE_VALUES.PENDING]: 'Pending',
  [STATE_VALUES.PROCESS]: 'Process',
  [STATE_VALUES.FULFILLED]: 'Fulfilled',
  [STATE_VALUES.CANCELED]: 'Canceled',
  [STATE_VALUES.UPDATING]: 'Updating',
  [STATE_VALUES.PICKED]: 'Picked',
  [STATE_VALUES.REFUND]: 'Refund',
  [STATE_VALUES.HOLD]: 'Hold',
  [STATE_VALUES.RESEND]: 'Resend',
};

export const STATE_COLORS = {
  [STATE_VALUES.PENDING]: '#0065FF',
  [STATE_VALUES.UPDATING]: '#2C3E5D',
  [STATE_VALUES.PICKED]: '#D97008',
  [STATE_VALUES.PROCESS]: '#0065FF',
  [STATE_VALUES.FULFILLED]: '#22A06B',
  [STATE_VALUES.CANCELED]: '#2C3E5D',
  [STATE_VALUES.REFUND]: '#E34935',
  [STATE_VALUES.HOLD]: '#8270DB',
  [STATE_VALUES.RESEND]: '#22A06B',
};

export const STATE_LABEL_VALUE_OPTIONS = [
  { label: 'Select state', value: '' },
  { label: STATE_LABELS[STATE_VALUES.ACTIVATED], value: STATE_VALUES.ACTIVATED },
  { label: STATE_LABELS[STATE_VALUES.BLOCKED], value: STATE_VALUES.BLOCKED },
];

export const ORDER_STATE_VALUES = [
  STATE_VALUES.PENDING,
  STATE_VALUES.UPDATING,
  STATE_VALUES.PICKED,
  STATE_VALUES.PROCESS,
  STATE_VALUES.FULFILLED,
  STATE_VALUES.CANCELED,
  STATE_VALUES.REFUND,
  STATE_VALUES.HOLD,
  STATE_VALUES.RESEND
];

export const ROLE_VALUES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  PARTNER: 'PARTNER',
  RESELLER: 'RESELLER',
  DESIGNER: 'DESIGNER',
  USER: 'USER',
};

export const ADMIN_ROLES = [ROLE_VALUES.SUPER_ADMIN, ROLE_VALUES.ADMIN];

export const ROLE_LABELS = {
  [ROLE_VALUES.SUPER_ADMIN]: 'Supper Admin',
  [ROLE_VALUES.ADMIN]: 'Admin',
  [ROLE_VALUES.PARTNER]: 'Partner',
  [ROLE_VALUES.RESELLER]: 'Reseller',
  [ROLE_VALUES.DESIGNER]: 'Designer',
  [ROLE_VALUES.USER]: 'User',
};

export const ROLES_LABEL_VALUE_OPTIONS = [
  { label: 'Select role', value: '' },
  { label: ROLE_LABELS[ROLE_VALUES.SUPER_ADMIN], value: ROLE_VALUES.SUPER_ADMIN },
  { label: ROLE_LABELS[ROLE_VALUES.ADMIN], value: ROLE_VALUES.ADMIN },
  { label: ROLE_LABELS[ROLE_VALUES.PARTNER], value: ROLE_VALUES.PARTNER },
  { label: ROLE_LABELS[ROLE_VALUES.RESELLER], value: ROLE_VALUES.RESELLER },
  { label: ROLE_LABELS[ROLE_VALUES.DESIGNER], value: ROLE_VALUES.DESIGNER },
  { label: ROLE_LABELS[ROLE_VALUES.USER], value: ROLE_VALUES.USER },
];


export const DESIGN_VALUES = {
  _2D: '2D',
  _3D: '3D',
};

export const DESIGN_LABELS = {
  [DESIGN_VALUES._2D]: '2D product',
  [DESIGN_VALUES._3D]: '3D product',
};

export const DESIGN_LABEL_VALUE_OPTIONS = [
  { label: DESIGN_LABELS[DESIGN_VALUES._2D], value: DESIGN_VALUES._2D },
  { label: DESIGN_LABELS[DESIGN_VALUES._3D], value: DESIGN_VALUES._3D },
];

export const STORE_TYPE_VALUES = {
  SHOPIFY: 'shopify',
  SHOP_BASE: 'shopbase',
  WOO_COMMERCE: 'woocommerce',
};

export const STORE_TYPE_LABELS = {
  [STORE_TYPE_VALUES.SHOPIFY]: 'Shopify',
  [STORE_TYPE_VALUES.SHOP_BASE]: 'ShopBase',
  [STORE_TYPE_VALUES.WOO_COMMERCE]: 'WooCommerce',
};

export const STORE_TYPE_ICONS = {
  [STORE_TYPE_VALUES.SHOPIFY]: shopifyLogo,
  [STORE_TYPE_VALUES.SHOP_BASE]: shopBaseLogo,
  [STORE_TYPE_VALUES.WOO_COMMERCE]: wooCommerceLogo,
};

export const STORE_TYPE_LABEL_VALUE_OPTIONS = [
  { label: 'All type', value: '' },
  { label: STORE_TYPE_LABELS[STORE_TYPE_VALUES.SHOPIFY], value: STORE_TYPE_VALUES.SHOPIFY },
  { label: STORE_TYPE_LABELS[STORE_TYPE_VALUES.SHOP_BASE], value: STORE_TYPE_VALUES.SHOP_BASE },
  { label: STORE_TYPE_LABELS[STORE_TYPE_VALUES.WOO_COMMERCE], value: STORE_TYPE_VALUES.WOO_COMMERCE },
];

export const DESIGN_DETAIL_TYPE_VALUES = {
  MOCKUP: 'MOCKUP',
  DESIGN: 'DESIGN',
};

export const TRACKING_STATUS_LABEL_VALUE_OPTIONS = [
  { label: 'Shipping status All', value: '' },
  { label: 'Have tracking', value: 'Yes' },
  { label: 'No tracking', value: 'No' },
];

export const SHIPPING_STATUS_LABEL_VALUE_OPTIONS = [
  { label: 'Shipping status All', value: '' },
  { label: 'No Active', value: 'no_active' },
  { label: 'Transit', value: 'transit' },
  { label: 'Transit WW', value: 'transit_ww' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Pick up', value: 'pickup' },
];

export const HAVE_DESIGN_LABEL_VALUE_OPTIONS = [
  { label: 'Have design All', value: '' },
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

export const CLONE_DESIGN_LABEL_VALUE_OPTIONS = [
  { label: 'Clone design All', value: '' },
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
];

export const TYPE_DATE_LABEL_VALUE_OPTIONS = [
  { label: 'Type date All', value: '' },
  { label: 'Create date', value: 'create_date' },
  { label: 'Upload tracking date', value: 'tracking_date' },
];

export const SORT_BY_LABEL_VALUE_OPTIONS = [
  { label: 'Sort by', value: '' },
  { label: 'Create date', value: 'create_date' },
  { label: 'Upload tracking date', value: 'tracking_date' },
];



