import shopifyLogo from 'images/shopify_logo.svg'
import shopBaseLogo from 'images/shopbase_logo.svg'
import wooCommerceLogo from 'images/woocommerce_logo.svg'

import {  ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

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
  SELLER_INTEGRATIONS_GET_TOKEN: '/integration/:vendorId/get-token',
  SELLER_INTEGRATION_ORDERS: '/integration/:vendorId/orders/:storeId/:storeName',
  SELLER_PRODUCT_CATEGORY: '/product-category',
  SELLER_TICKETS: '/tickets',
  SELLER_CHAT_WITH_ME: '/chat-with-me',
  SELLER_CREATOR_COMMUNITY: '/creator-community',
  ADMIN_PRODUCTS_MANAGEMENT: '/products-management',
  ADMIN_DETAIL_PRODUCT: '/products-management/:productId',
  ADMIN_CATEGORIES_MANAGEMENT: '/categories-management',
  ADMIN_USER_AND_ROLES_MANAGEMENT: '/admins-and-roles-management',
  ADMIN_USERS_MANAGEMENT: '/users-management',
  ADMIN_DETAIL_USER: '/users-management/:userId',
  ADMIN_DETAIL_USER_WITH_ROLE: '/users-management/:userId/:role',
  ADMIN_ROLES_MANAGEMENT: '/roles-management',
  ADMIN_ORDERS_MANAGEMENT: '/orders-management',
  ADMIN_TRANSACTIONS_MANAGEMENT: '/transactions-management',
  ADMIN_SELLER_WALLETS_MANAGEMENT: '/seller-wallets-management',
  ADMIN_BANKS_MANAGEMENT: '/banks-management',
  ADMIN_STORES_MANAGEMENT: '/stores-management',
  ADMIN_SELLERS_MANAGEMENT: '/sellers-management',
  ADMIN_SYSTEM_ACCOUNTING_MANAGEMENT: '/system-accounting-management',
  ADMIN_STATISTICS_MANAGEMENT: '/statistics-management',
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
  DEACTIVATED : 'DEACTIVATED',
  PENDING: 'PENDING',
  PROCESS: 'PROCESS',
  DELIVERED: 'DELIVERED',
  CANCEL : 'CANCEL',
  UPDATE : 'UPDATE',
  PICKING : 'PICKING',
  ALERT : 'ALERT',
  HOLD : 'HOLD',
  RESEND : 'RESEND',
  TRANSIT : 'TRANSIT',
  COMPLETED : 'COMPLETED',
  REJECTED : 'REJECTED',
};

export const STATE_LABELS = {
  [STATE_VALUES.ACTIVATED]: 'Activated',
  [STATE_VALUES.BLOCKED]: 'No Active',
  [STATE_VALUES.PENDING]: 'Pending',
  [STATE_VALUES.PROCESS]: 'Process',
  [STATE_VALUES.DELIVERED]: 'Delivered',
  [STATE_VALUES.CANCEL]: 'Cancel',
  [STATE_VALUES.UPDATE]: 'Update',
  [STATE_VALUES.PICKING]: 'Picking',
  [STATE_VALUES.ALERT]: 'Alert',
  [STATE_VALUES.HOLD]: 'Hold',
  [STATE_VALUES.RESEND]: 'Resend',
  [STATE_VALUES.TRANSIT]: 'Transit',
  [STATE_VALUES.DEACTIVATED]: 'Deactivated',
};

export const STATE_COLORS = {
  [STATE_VALUES.PENDING]: '#0065FF',
  [STATE_VALUES.UPDATE]: '#2C3E5D',
  [STATE_VALUES.PICKING]: '#D97008',
  [STATE_VALUES.PROCESS]: '#0065FF',
  [STATE_VALUES.TRANSIT]: '#E34935',
  [STATE_VALUES.DELIVERED]: '#22A06B',
  [STATE_VALUES.CANCEL]: '#2C3E5D',
  [STATE_VALUES.ALERT]: '#E34935',
  [STATE_VALUES.HOLD]: '#8270DB',
  [STATE_VALUES.RESEND]: '#22A06B',
  [STATE_VALUES.COMPLETED]: '#22A06B',
  [STATE_VALUES.ACTIVATED]: '#22A06B',
};

export const STATE_LABEL_VALUE_OPTIONS = [
  { label: 'Select state', value: '' },
  { label: STATE_LABELS[STATE_VALUES.ACTIVATED], value: STATE_VALUES.ACTIVATED },
  { label: STATE_LABELS[STATE_VALUES.BLOCKED], value: STATE_VALUES.BLOCKED },
];

export const ORDER_STATE_VALUES = [
  STATE_VALUES.PENDING,
  STATE_VALUES.UPDATE,
  STATE_VALUES.PICKING,
  STATE_VALUES.PROCESS,
  STATE_VALUES.TRANSIT,
  STATE_VALUES.DELIVERED,
  STATE_VALUES.HOLD,
  STATE_VALUES.ALERT,
  STATE_VALUES.RESEND,
  STATE_VALUES.CANCEL
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

export const SELLER_STAFF_ROLES_LABEL_VALUE_OPTIONS = [
  { label: ROLE_LABELS[ROLE_VALUES.RESELLER], value: ROLE_VALUES.RESELLER },
  { label: ROLE_LABELS[ROLE_VALUES.DESIGNER], value: ROLE_VALUES.DESIGNER },
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
  { label: 'Tracking status All', value: '' },
  { label: 'Have tracking', value: 'Yes' },
  { label: 'No tracking', value: 'No' },
];

export const SHIPPING_STATUS_VALUES = {
  NO_ACTIVE: 'no_active',
  TRANSIT: 'transit',
  TRANSIT_WW: 'transit_ww',
  DELIVERED: 'delivered',
  PICKUP: 'pickup',
};

export const SHIPPING_STATUS_LABELS = {
  [SHIPPING_STATUS_VALUES.NO_ACTIVE]: 'No Active',
  [SHIPPING_STATUS_VALUES.TRANSIT]: 'Transit',
  [SHIPPING_STATUS_VALUES.TRANSIT_WW]: 'Transit WW',
  [SHIPPING_STATUS_VALUES.DELIVERED]: 'Delivered',
  [SHIPPING_STATUS_VALUES.PICKUP]: 'Pick up',
};


export const SHIPPING_STATUS_LABEL_VALUE_OPTIONS = [
  { label: 'Shipping status All', value: '' },
  { label: SHIPPING_STATUS_LABELS[SHIPPING_STATUS_VALUES.NO_ACTIVE], value: SHIPPING_STATUS_VALUES.NO_ACTIVE },
  { label: SHIPPING_STATUS_LABELS[SHIPPING_STATUS_VALUES.TRANSIT], value: SHIPPING_STATUS_VALUES.TRANSIT },
  { label: SHIPPING_STATUS_LABELS[SHIPPING_STATUS_VALUES.TRANSIT_WW], value: SHIPPING_STATUS_VALUES.TRANSIT_WW },
  { label: SHIPPING_STATUS_LABELS[SHIPPING_STATUS_VALUES.DELIVERED], value: SHIPPING_STATUS_VALUES.DELIVERED },
  { label: SHIPPING_STATUS_LABELS[SHIPPING_STATUS_VALUES.PICKUP], value: SHIPPING_STATUS_VALUES.PICKUP },
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
  { label: 'Sort by time', value: '' },
  { label: 'Create date', value: 'create_date' },
  { label: 'Upload tracking date', value: 'tracking_date' },
];

export const SORT_BY_LABEL_VALUE_OPTIONS = [
  { label: 'Sort by order', value: '' },
  { label: <><span>New - Old </span><ArrowDownOutlined /> </>, value: 'time_order_desc' },
  { label: <><span>Old - New </span><ArrowUpOutlined /> </>, value: 'time_order_acs' },
];


export const TRANSACTION_TYPE_VALUES = {
  TOP_UP: 'TOPUP',
  WITHDRAW: 'WITHDRAW',
};

export const TRANSACTION_TYPE_LABELS = {
  [TRANSACTION_TYPE_VALUES.TOP_UP]: 'Top up',
  [TRANSACTION_TYPE_VALUES.WITHDRAW]: 'Withdraw',
};

export const TRANSACTION_TYPE_LABEL_VALUE_OPTIONS = [
  { label: 'Transaction Type All', value: '' },
  { label: TRANSACTION_TYPE_LABELS[TRANSACTION_TYPE_VALUES.TOP_UP], value: TRANSACTION_TYPE_VALUES.TOP_UP },
  { label: TRANSACTION_TYPE_LABELS[TRANSACTION_TYPE_VALUES.WITHDRAW], value: TRANSACTION_TYPE_VALUES.WITHDRAW },
];

export const TRANSACTION_STATUS_LABELS = {
  [STATE_VALUES.ACTIVATED]: 'Completed',
  [STATE_VALUES.PENDING]: 'Wait confirm',
  [STATE_VALUES.REJECTED]: 'Rejected',
};

export const TRANSACTION_STATUS_LABEL_VALUE_OPTIONS = [
  { label: 'Transaction Status All', value: '' },
  { label: TRANSACTION_STATUS_LABELS[STATE_VALUES.ACTIVATED], value: STATE_VALUES.ACTIVATED },
  { label: TRANSACTION_STATUS_LABELS[STATE_VALUES.PENDING], value: STATE_VALUES.PENDING },
  { label: TRANSACTION_STATUS_LABELS[STATE_VALUES.REJECTED], value: STATE_VALUES.REJECTED },
];


export const BANK_TYPE_VALUES = {
  BANK: 'BANK',
  PAYONEER: 'PAYONER',
  PINGPONG : 'PINGPONG ',
};

export const BANK_TYPE_LABELS = {
  [BANK_TYPE_VALUES.BANK]: 'Bank of Viet Nam',
  [BANK_TYPE_VALUES.PAYONEER]: 'Payoneer',
  [BANK_TYPE_VALUES.PINGPONG]: 'Pingpong',
};

export const BANK_TYPE_LABEL_VALUE_OPTIONS = [
  { label: 'Select bank type', value: '' },
  { label: BANK_TYPE_LABELS[BANK_TYPE_VALUES.BANK], value: BANK_TYPE_VALUES.BANK },
  { label: BANK_TYPE_LABELS[BANK_TYPE_VALUES.PAYONEER], value: BANK_TYPE_VALUES.PAYONEER },
  { label: BANK_TYPE_LABELS[BANK_TYPE_VALUES.PINGPONG], value: BANK_TYPE_VALUES.PINGPONG },
];

export const STORE_STATE_LABEL_VALUE_OPTIONS = [
  { label: 'Select store state', value: '' },
  { label: STATE_LABELS[STATE_VALUES.ACTIVATED], value: STATE_VALUES.ACTIVATED },
  { label: STATE_LABELS[STATE_VALUES.DEACTIVATED], value: STATE_VALUES.DEACTIVATED },
];

export const SELLER_STATE_LABEL_VALUE_OPTIONS = [
  { label: 'Select seller state', value: '' },
  { label: STATE_LABELS[STATE_VALUES.ACTIVATED], value: STATE_VALUES.ACTIVATED },
  { label: STATE_LABELS[STATE_VALUES.DEACTIVATED], value: STATE_VALUES.DEACTIVATED },
];
