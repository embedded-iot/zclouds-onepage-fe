import shopifyLogo from 'images/shopify_logo.svg'
import shopBaseLogo from 'images/shopbase_logo.svg'
import wooCommerceLogo from 'images/woocommerce_logo.svg'

import {  ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';

export const WEBSITE_NAME = 'CS Fulfill';
export const ROUTERS = {
  ROOT: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  NOTIFICATIONS: '/notifications',
  FORGOT_PASSWORD: '/forgot-password',
  CHANGE_PASSWORD: '/change-password',
  FRONT_USER_REGISTER: '/register',
  FRONT_USER_ALL_PRODUCTS: '/products',
  FRONT_USER_ALL_PRODUCTS_WITH_CATEGORY: '/products/:categoryName/:categoryId',
  FRONT_USER_PRODUCT_DETAIL: '/products/:categoryName/:productName/:categoryId/:productId',
  FRONT_USER_SKU: '/sku',
  FRONT_USER_BLOGS: '/blogs',
  FRONT_USER_BLOG_DETAIL: '/blogs/:blogCategoryName/:blogName/:blogCategoryId/:blogId',
  SELLER_ORDERS: '/orders',
  SELLER_DETAIL_ORDER: '/orders/:orderId',
  SELLER_DETAIL_ORDER_WITH_PRODUCT: '/orders/:orderId/productId/:productId',
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
  ADMIN_DETAIL_ORDER_MANAGEMENT: '/orders-management/:orderId',
  ADMIN_TRANSACTIONS_MANAGEMENT: '/transactions-management',
  ADMIN_SELLER_WALLETS_MANAGEMENT: '/seller-wallets-management',
  ADMIN_SELLER_WALLET_DETAILS_MANAGEMENT: '/seller-wallets-management/:sellerId',
  ADMIN_BANKS_MANAGEMENT: '/banks-management',
  ADMIN_STORES_MANAGEMENT: '/stores-management',
  ADMIN_SELLERS_MANAGEMENT: '/sellers-management',
  ADMIN_SYSTEM_ACCOUNTING_MANAGEMENT: '/system-accounting-management',
  ADMIN_STATISTICS_MANAGEMENT: '/statistics-management',
  ADMIN_DESIGNS_MANAGEMENT: '/designs-management',
  ADMIN_PRODUCERS_MANAGEMENT: '/producers-management',
  ADMIN_SYSTEM_CONFIGS_MANAGEMENT: '/system-configs-management',
  ADMIN_SYSTEM_NOTIFICATIONS_MANAGEMENT: '/system-notifications-management',
  ADMIN_SYSTEM_SETTINGS_MANAGEMENT: '/system-settings-management',
  ADMIN_SYSTEM_FAQS_MANAGEMENT: '/system-faqs-management',
  ADMIN_SYSTEM_BLOG_CATEGORIES_MANAGEMENT: '/system-blog-categories-management',
  ADMIN_SYSTEM_BLOGS_MANAGEMENT: '/system-blogs-management',
  ADMIN_SYSTEM_EMAILS_MANAGEMENT: '/system-emails-management',
}

export const DATETIME_FORMAT = "DD/MM/YYYY HH:mm";
export const DATE_FORMAT = "DD/MM/YYYY";
export const DATA_DATE_FORMAT = "YYYY-MM-DD";

export const RESPONSIVE_MEDIAS = {
  MOBILE: { query: '(max-width: 768px)' },
  TABLET: { query: '(max-width: 1124px)' },
  EX_TABLET: { query: '(max-width: 1366px)' },
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
  ALERT : 'ALERT',
  HOLD : 'HOLD',
  RESEND : 'RESEND',
  TRANSIT : 'TRANSIT',
  COMPLETED : 'COMPLETED',
  REJECTED : 'REJECTED',
  IS_ACTIVE : 'IS_ACTIVE',
  NOT_ACTIVE  : 'NOT_ACTIVE',
  DELETED   : 'DELETED',
};

export const STATE_LABELS = {
  [STATE_VALUES.ACTIVATED]: 'Activated',
  [STATE_VALUES.IS_ACTIVE]: 'Activated',
  [STATE_VALUES.BLOCKED]: 'No Active',
  [STATE_VALUES.NOT_ACTIVE]: 'No Active',
  [STATE_VALUES.PENDING]: 'Pending',
  [STATE_VALUES.PROCESS]: 'Process',
  [STATE_VALUES.DELIVERED]: 'Delivered',
  [STATE_VALUES.CANCEL]: 'Cancel',
  [STATE_VALUES.UPDATE]: 'Update',
  [STATE_VALUES.ALERT]: 'Alert',
  [STATE_VALUES.HOLD]: 'Hold',
  [STATE_VALUES.RESEND]: 'Resend',
  [STATE_VALUES.TRANSIT]: 'Transit',
  [STATE_VALUES.DEACTIVATED]: 'Deactivated',
  [STATE_VALUES.DELETED]: 'Deleted',
};

export const STATE_COLORS = {
  [STATE_VALUES.PENDING]: '#0065FF',
  [STATE_VALUES.UPDATE]: '#2C3E5D',
  [STATE_VALUES.PROCESS]: '#0065FF',
  [STATE_VALUES.TRANSIT]: '#E34935',
  [STATE_VALUES.DELIVERED]: '#22A06B',
  [STATE_VALUES.CANCEL]: '#2C3E5D',
  [STATE_VALUES.ALERT]: '#E34935',
  [STATE_VALUES.HOLD]: '#8270DB',
  [STATE_VALUES.RESEND]: '#22A06B',
  [STATE_VALUES.COMPLETED]: '#22A06B',
  [STATE_VALUES.ACTIVATED]: '#22A06B',
  [STATE_VALUES.IS_ACTIVE]: '#22A06B',
};

export const STATE_LABEL_VALUE_OPTIONS = [
  { label: 'Select state', value: '' },
  { label: STATE_LABELS[STATE_VALUES.ACTIVATED], value: STATE_VALUES.ACTIVATED },
  { label: STATE_LABELS[STATE_VALUES.BLOCKED], value: STATE_VALUES.BLOCKED },
];

export const ORDER_STATE_VALUES = [
  STATE_VALUES.PENDING,
  STATE_VALUES.UPDATE,
  STATE_VALUES.PROCESS,
  STATE_VALUES.TRANSIT,
  STATE_VALUES.DELIVERED,
  STATE_VALUES.HOLD,
  STATE_VALUES.ALERT,
  STATE_VALUES.RESEND,
  STATE_VALUES.CANCEL
];

export const PERMISSION_VALUES = {
  SELLER_VIEW_DASHBOARD: 'VIEW_DASHBOARD',
  SELLER_VIEW_ORDERS: 'VIEW_ORDERS',
  SELLER_ADD_EDIT_ORDER: 'ADD_EDIT_ORDER',
  SELLER_VIEW_DESIGNS: 'VIEW_DESIGNS',
  SELLER_ADD_EDIT_DESIGN: 'ADD_EDIT_DESIGN',
  SELLER_VIEW_STAFFS: 'VIEW_STAFFS',
  SELLER_ADD_EDIT_STAFF: 'ADD_EDIT_STAFF',
  SELLER_VIEW_STORES: 'VIEW_STORES',
  SELLER_ADD_EDIT_STORE: 'ADD_EDIT_STORE',
  SELLER_VIEW_WALLET: 'VIEW_WALLET',
  ADMIN_VIEW_ORDERS: 'VIEW_ORDERS',
  ADMIN_ADD_EDIT_ORDER: 'ADD_EDIT_ORDER',
  ADMIN_VIEW_PRODUCTS: 'VIEW_PRODUCTS',
  ADMIN_ADD_EDIT_PRODUCT: 'ADD_EDIT_PRODUCT',
  ADMIN_DELETE_PRODUCT: 'DELETE_PRODUCT',
  ADMIN_VIEW_STORES: 'VIEW_STORES',
  ADMIN_ADD_EDIT_STORE: 'ADD_EDIT_STORE',
  ADMIN_VIEW_DESIGNS: 'VIEW_DESIGNS',
  ADMIN_VIEW_PRODUCERS: 'VIEW_PRODUCERS',
  ADMIN_ADD_EDIT_PRODUCER: 'ADD_EDIT_PRODUCER',
  ADMIN_DELETE_PRODUCER: 'DELETE_PRODUCER',
  ADMIN_VIEW_CATEGORIES: 'VIEW_CATEGORIES',
  ADMIN_ADD_EDIT_CATEGORY: 'ADD_EDIT_CATEGORY',
  ADMIN_DELETE_CATEGORY: 'DELETE_CATEGORY',
  ADMIN_VIEW_USERS: 'VIEW_USERS',
  ADMIN_ADD_EDIT_USER: 'ADD_EDIT_USER',
  ADMIN_DELETE_USER: 'DELETE_USER',
  ADMIN_VIEW_STATISTICS: 'VIEW_STATISTICS',
  ADMIN_VIEW_TRANSACTIONS: 'VIEW_TRANSACTIONS',
  ADMIN_ADD_EDIT_TRANSACTIONS: 'ADD_EDIT_TRANSACTIONS',
  ADMIN_VIEW_SELLER_WALLETS: 'VIEW_SELLER_WALLETS',
  ADMIN_ADD_EDIT_SELLER_WALLETS: 'ADD_EDIT_SELLER_WALLETS',
  ADMIN_VIEW_BANKS: 'VIEW_BANKS',
  ADMIN_ADD_EDIT_BANK: 'ADD_EDIT_BANK',
  ADMIN_DELETE_BANK: 'DELETE_EDIT_BANK',
  ADMIN_VIEW_NOTIFICATIONS: 'VIEW_NOTIFICATIONS',
  ADMIN_ADD_EDIT_NOTIFICATION: 'ADD_EDIT_NOTIFICATION',
  ADMIN_DELETE_NOTIFICATION: 'DELETE_NOTIFICATION',
  ADMIN_VIEW_FAQS: 'VIEW_FAQS',
  ADMIN_ADD_EDIT_FAQ: 'ADD_EDIT_FAQ',
  ADMIN_DELETE_FAQ: 'DELETE_FAQ',
  ADMIN_VIEW_CONFIGS: 'VIEW_CONFIGS',
  ADMIN_ADD_EDIT_CONFIG: 'ADD_EDIT_CONFIG',
  ADMIN_DELETE_CONFIG: 'DELETE_CONFIG',
  ADMIN_VIEW_BLOGS: 'VIEW_BLOGS',
  ADMIN_ADD_EDIT_BLOG: 'ADD_EDIT_BLOG',
  ADMIN_DELETE_BLOG: 'ADMIN_DELETE_BLOG',
  ADMIN_VIEW_EMAILS: 'ADMIN_VIEW_EMAILS',
  ADMIN_ADD_EDIT_EMAIL: 'ADD_EDIT_EMAIL',
  ADMIN_DELETE_EMAIL: 'ADMIN_DELETE_EMAIL',
};

export const ROLE_VALUES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  ADMIN: 'ADMIN',
  ACCOUNTING: 'ACCOUNTING',
  MANAGER: 'MANAGER',
  RESELLER: 'SELLER',
  DESIGNER: 'DESIGNER',
};

export const ROLE_PERMISSIONS_VALUES = {
  [ROLE_VALUES.SUPER_ADMIN]: [
    PERMISSION_VALUES.ADMIN_VIEW_ORDERS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_ORDER,
    PERMISSION_VALUES.ADMIN_VIEW_PRODUCTS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_PRODUCT,
    PERMISSION_VALUES.ADMIN_DELETE_PRODUCT,
    PERMISSION_VALUES.ADMIN_VIEW_STORES,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_STORE,
    PERMISSION_VALUES.ADMIN_VIEW_DESIGNS,
    PERMISSION_VALUES.ADMIN_VIEW_PRODUCERS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_PRODUCER,
    PERMISSION_VALUES.ADMIN_DELETE_PRODUCER,
    PERMISSION_VALUES.ADMIN_VIEW_CATEGORIES,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_CATEGORY,
    PERMISSION_VALUES.ADMIN_DELETE_CATEGORY,
    PERMISSION_VALUES.ADMIN_VIEW_USERS,
    PERMISSION_VALUES.ADMIN_VIEW_STATISTICS,
    PERMISSION_VALUES.ADMIN_VIEW_TRANSACTIONS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_TRANSACTIONS,
    PERMISSION_VALUES.ADMIN_VIEW_SELLER_WALLETS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_SELLER_WALLETS,
    PERMISSION_VALUES.ADMIN_VIEW_BANKS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_BANK,
    PERMISSION_VALUES.ADMIN_DELETE_BANK,
    PERMISSION_VALUES.ADMIN_VIEW_NOTIFICATIONS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_NOTIFICATION,
    PERMISSION_VALUES.ADMIN_DELETE_NOTIFICATION,
    PERMISSION_VALUES.ADMIN_VIEW_CONFIGS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_CONFIG,
    PERMISSION_VALUES.ADMIN_DELETE_CONFIG,
    PERMISSION_VALUES.ADMIN_VIEW_FAQS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_FAQ,
    PERMISSION_VALUES.ADMIN_DELETE_FAQ,
    PERMISSION_VALUES.ADMIN_VIEW_BLOGS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_BLOG,
    PERMISSION_VALUES.ADMIN_DELETE_BLOG,
    PERMISSION_VALUES.ADMIN_VIEW_EMAILS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_EMAIL,
    PERMISSION_VALUES.ADMIN_DELETE_EMAIL,
  ],
  [ROLE_VALUES.ADMIN]: [
    PERMISSION_VALUES.ADMIN_VIEW_ORDERS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_ORDER,
    PERMISSION_VALUES.ADMIN_VIEW_PRODUCTS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_PRODUCT,
    PERMISSION_VALUES.ADMIN_VIEW_STORES,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_STORE,
    PERMISSION_VALUES.ADMIN_VIEW_DESIGNS,
    PERMISSION_VALUES.ADMIN_VIEW_PRODUCERS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_PRODUCER,
    PERMISSION_VALUES.ADMIN_VIEW_CATEGORIES,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_CATEGORY,
    PERMISSION_VALUES.ADMIN_VIEW_USERS,
    PERMISSION_VALUES.ADMIN_VIEW_STATISTICS,
    PERMISSION_VALUES.ADMIN_VIEW_TRANSACTIONS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_TRANSACTIONS,
    PERMISSION_VALUES.ADMIN_VIEW_SELLER_WALLETS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_SELLER_WALLETS,
    PERMISSION_VALUES.ADMIN_VIEW_BANKS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_BANK,
    PERMISSION_VALUES.ADMIN_VIEW_NOTIFICATIONS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_NOTIFICATION,
    PERMISSION_VALUES.ADMIN_VIEW_CONFIGS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_CONFIG,
    PERMISSION_VALUES.ADMIN_VIEW_FAQS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_FAQ,
    PERMISSION_VALUES.ADMIN_VIEW_BLOGS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_BLOG,
    PERMISSION_VALUES.ADMIN_VIEW_EMAILS,
    PERMISSION_VALUES.ADMIN_ADD_EDIT_EMAIL,
    PERMISSION_VALUES.ADMIN_DELETE_EMAIL,
  ],
  [ROLE_VALUES.ACCOUNTING]: [
    PERMISSION_VALUES.ADMIN_VIEW_ORDERS,
    PERMISSION_VALUES.ADMIN_VIEW_STATISTICS,
    PERMISSION_VALUES.ADMIN_VIEW_TRANSACTIONS,
    PERMISSION_VALUES.ADMIN_VIEW_SELLER_WALLETS,
    PERMISSION_VALUES.ADMIN_VIEW_BANKS,
    PERMISSION_VALUES.ADMIN_VIEW_BLOGS,
    PERMISSION_VALUES.ADMIN_VIEW_EMAILS,
  ],
  [ROLE_VALUES.MANAGER]: [
    PERMISSION_VALUES.ADMIN_VIEW_ORDERS,
    PERMISSION_VALUES.ADMIN_VIEW_PRODUCTS,
    PERMISSION_VALUES.ADMIN_VIEW_STORES,
    PERMISSION_VALUES.ADMIN_VIEW_DESIGNS,
    PERMISSION_VALUES.ADMIN_VIEW_PRODUCERS,
    PERMISSION_VALUES.ADMIN_VIEW_CATEGORIES,
    PERMISSION_VALUES.ADMIN_VIEW_USERS,
    PERMISSION_VALUES.ADMIN_VIEW_NOTIFICATIONS,
    PERMISSION_VALUES.ADMIN_VIEW_CONFIGS,
    PERMISSION_VALUES.ADMIN_VIEW_FAQS,
    PERMISSION_VALUES.ADMIN_VIEW_BLOGS,
    PERMISSION_VALUES.ADMIN_VIEW_EMAILS,
  ],
  [ROLE_VALUES.RESELLER]: [
    PERMISSION_VALUES.SELLER_VIEW_DASHBOARD,
    PERMISSION_VALUES.SELLER_VIEW_ORDERS,
    PERMISSION_VALUES.SELLER_ADD_EDIT_ORDER,
    PERMISSION_VALUES.SELLER_VIEW_DESIGNS,
    PERMISSION_VALUES.SELLER_ADD_EDIT_DESIGN,
    // PERMISSION_VALUES.SELLER_VIEW_STAFFS,
    // PERMISSION_VALUES.SELLER_ADD_EDIT_STAFF,
    PERMISSION_VALUES.SELLER_VIEW_STORES,
    PERMISSION_VALUES.SELLER_ADD_EDIT_STORE,
    PERMISSION_VALUES.SELLER_VIEW_WALLET,
  ],
  [ROLE_VALUES.DESIGNER]: [
    PERMISSION_VALUES.SELLER_VIEW_ORDERS,
    PERMISSION_VALUES.SELLER_VIEW_DESIGNS,
    PERMISSION_VALUES.SELLER_ADD_EDIT_DESIGN,
  ],
};

export const ADMIN_ROLES = [ROLE_VALUES.SUPER_ADMIN, ROLE_VALUES.ADMIN, ROLE_VALUES.ACCOUNTING, ROLE_VALUES.MANAGER];

export const ROLE_LABELS = {
  [ROLE_VALUES.SUPER_ADMIN]: 'Supper Admin',
  [ROLE_VALUES.ADMIN]: 'Admin',
  [ROLE_VALUES.ACCOUNTING]: 'Accounting',
  [ROLE_VALUES.MANAGER]: 'Manager',
  [ROLE_VALUES.RESELLER]: 'Seller',
  [ROLE_VALUES.DESIGNER]: 'Designer',
};

export const ROLES_LABEL_VALUE_OPTIONS = [
  { label: 'Select role', value: '' },
  { label: ROLE_LABELS[ROLE_VALUES.SUPER_ADMIN], value: ROLE_VALUES.SUPER_ADMIN },
  { label: ROLE_LABELS[ROLE_VALUES.ADMIN], value: ROLE_VALUES.ADMIN },
  { label: ROLE_LABELS[ROLE_VALUES.ACCOUNTING], value: ROLE_VALUES.ACCOUNTING },
  { label: ROLE_LABELS[ROLE_VALUES.MANAGER], value: ROLE_VALUES.MANAGER },
  { label: ROLE_LABELS[ROLE_VALUES.RESELLER], value: ROLE_VALUES.RESELLER },
  { label: ROLE_LABELS[ROLE_VALUES.DESIGNER], value: ROLE_VALUES.DESIGNER },
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
  { label: 'Have tracking', value: 'yes' },
  { label: 'No tracking', value: 'no' },
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
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

export const CLONE_DESIGN_LABEL_VALUE_OPTIONS = [
  { label: 'Clone design All', value: '' },
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

export const TYPE_DATE_LABEL_VALUE_OPTIONS = [
  { label: 'Sort by time', value: '' },
  { label: 'Create date', value: 'dateOrder' },
  { label: 'Upload tracking date', value: 'trackingDate' },
];

export const SORT_BY_LABEL_VALUE_OPTIONS = [
  { label: 'Sort by order', value: '' },
  { label: <><span>New - Old </span><ArrowDownOutlined /> </>, value: 'desc' },
  { label: <><span>Old - New </span><ArrowUpOutlined /> </>, value: 'acs' },
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
  { label: STATE_LABELS[STATE_VALUES.BLOCKED], value: STATE_VALUES.BLOCKED },
];

export const DESIGN_STATE_LABEL_VALUE_OPTIONS = [
  { label: 'Select seller state', value: '' },
  { label: STATE_LABELS[STATE_VALUES.ACTIVATED], value: STATE_VALUES.ACTIVATED },
  { label: STATE_LABELS[STATE_VALUES.DEACTIVATED], value: STATE_VALUES.DEACTIVATED },
];

export const FAQ_STATE_LABEL_VALUE_OPTIONS = [
  { label: 'Select FAQ state', value: '' },
  { label: STATE_LABELS[STATE_VALUES.ACTIVATED], value: STATE_VALUES.ACTIVATED },
  { label: STATE_LABELS[STATE_VALUES.DEACTIVATED], value: STATE_VALUES.DEACTIVATED },
];

export const SYSTEM_STATE_LABEL_VALUE_OPTIONS = [
  { label: 'Select state', value: '' },
  { label: STATE_LABELS[STATE_VALUES.IS_ACTIVE], value: STATE_VALUES.IS_ACTIVE },
  { label: STATE_LABELS[STATE_VALUES.NOT_ACTIVE], value: STATE_VALUES.NOT_ACTIVE },
];

export const NOTIFICATION_STATE_LABEL_VALUE_OPTIONS = [
  { label: 'Select state', value: '' },
  { label: STATE_LABELS[STATE_VALUES.IS_ACTIVE], value: STATE_VALUES.IS_ACTIVE },
  { label: STATE_LABELS[STATE_VALUES.NOT_ACTIVE], value: STATE_VALUES.NOT_ACTIVE },
];

export const PRODUCER_STATE_LABEL_VALUE_OPTIONS = [
  { label: 'Select state', value: '' },
  { label: STATE_LABELS[STATE_VALUES.ACTIVATED], value: STATE_VALUES.ACTIVATED },
  { label: STATE_LABELS[STATE_VALUES.BLOCKED], value: STATE_VALUES.BLOCKED },
  { label: STATE_LABELS[STATE_VALUES.DELETED], value: STATE_VALUES.DELETED },
];

export const BLOG_CATEGORIES_STATE_LABEL_VALUE_OPTIONS = [
  { label: 'Select blog category state', value: '' },
  { label: STATE_LABELS[STATE_VALUES.ACTIVATED], value: STATE_VALUES.ACTIVATED },
  { label: STATE_LABELS[STATE_VALUES.DEACTIVATED], value: STATE_VALUES.DEACTIVATED },
];

export const BLOGS_STATE_LABEL_VALUE_OPTIONS = [
  { label: 'Select blog status', value: '' },
  { label: STATE_LABELS[STATE_VALUES.ACTIVATED], value: STATE_VALUES.ACTIVATED },
  { label: STATE_LABELS[STATE_VALUES.DEACTIVATED], value: STATE_VALUES.DEACTIVATED },
];

export const EMAILS_STATE_LABEL_VALUE_OPTIONS = [
  { label: 'Select email status', value: '' },
  { label: STATE_LABELS[STATE_VALUES.ACTIVATED], value: STATE_VALUES.ACTIVATED },
  { label: STATE_LABELS[STATE_VALUES.DEACTIVATED], value: STATE_VALUES.DEACTIVATED },
];

export const SYSTEM_CONFIG_VALUE = {
  SELLER_MIN_TOP_UP: 'SELLER_MIN_TOP_UP',
  SELLER_RATE_VND_USD: 'SELLER_RATE_VND_USD',
  SELLER_CHAT_WITH_ME: 'SELLER_CHAT_WITH_ME',
  SELLER_CREATOR_COMMUNITY: 'SELLER_CREATOR_COMMUNITY',
  SELLER_FULFILL: 'SELLER_FULFILL',
  SELLER_FULFILL_FULFILLMENT_COMMUNITY: 'SELLER_FULFILL_FULFILLMENT_COMMUNITY',
  SELLER_EMAIL_SUPPORT: 'SELLER_EMAIL_SUPPORT',
  SELLER_HOTLINE: 'SELLER_HOTLINE',
  SELLER_SUPPORT_NAME_1: 'SELLER_SUPPORT_NAME_1',
  SELLER_SUPPORT_AVATAR_1: 'SELLER_SUPPORT_AVATAR_1',
  SELLER_SUPPORT_NAME_2: 'SELLER_SUPPORT_NAME_2',
  SELLER_SUPPORT_AVATAR_2: 'SELLER_SUPPORT_AVATAR_2',
  SELLER_SUPPORT_NAME_3: 'SELLER_SUPPORT_NAME_3',
  SELLER_SUPPORT_AVATAR_3: 'SELLER_SUPPORT_AVATAR_3',
  SELLER_ORDER_2D_TEMPLATE: 'SELLER_ORDER_2D_TEMPLATE',
  SELLER_ORDER_3D_TEMPLATE: 'SELLER_ORDER_3D_TEMPLATE',
  SELLER_CONNECT_SHOPIFY_STORE_INSTRUCTIONS_VIDEO: 'SELLER_CONNECT_SHOPIFY_STORE_INSTRUCTIONS_VIDEO',
  SELLER_CONNECT_SHOPBASE_STORE_INSTRUCTIONS_VIDEO: 'SELLER_CONNECT_SHOPBASE_STORE_INSTRUCTIONS_VIDEO',
  SELLER_CONNECT_WOOCOMMERCE_STORE_INSTRUCTIONS_VIDEO: 'SELLER_CONNECT_WOOCOMMERCE_STORE_INSTRUCTIONS_VIDEO',
  HOME_ADDRESS: 'HOME_ADDRESS',
  HOME_EMAIL: 'HOME_EMAIL',
  HOME_FACEBOOK_PAGE_ID: 'HOME_FACEBOOK_PAGE_ID',
  HOME_PHONE_CALL: 'HOME_PHONE_CALL',
  HOME_ZALO: 'HOME_ZALO',
  HOME_FACEBOOK: 'HOME_FACEBOOK',
};

export const PERIOD_STATE_LABEL_VALUE_OPTIONS = [
  { label: 'Select period', value: '' },
  { label: 'Today', value: 1 },
  { label: 'Last 7 days', value: 7 },
  { label: 'Last 14 days', value: 14 },
  { label: 'Last 30 days', value: 30 },
  { label: 'Last 60 days', value: 60 },
];

export const ORDER_EVENT_VALUES = {
  ORDER_CREATE: 'ORDER_CREATE',
  ORDER_UPDATE: 'ORDER_UPDATE',
  ORDER_UPDATE_STATUS : 'ORDER_UPDATE_STATUS',
  ORDER_UPDATE_PRODUCT_PRICE : 'ORDER_UPDATE_PRODUCT_PRICE',
  ORDER_UPDATE_PRODUCER : 'ORDER_UPDATE_PRODUCER',
  TRACKING_CODE_CREATE  : 'TRACKING_CODE_CREATE',
};

export const ORDER_EVENT_LABELS = {
  [ORDER_EVENT_VALUES.ORDER_CREATE]: 'Create order',
  [ORDER_EVENT_VALUES.ORDER_UPDATE]: 'Update order',
  [ORDER_EVENT_VALUES.ORDER_UPDATE_STATUS]: 'Update status',
  [ORDER_EVENT_VALUES.ORDER_UPDATE_PRODUCT_PRICE]: 'Update product price',
  [ORDER_EVENT_VALUES.ORDER_UPDATE_PRODUCER]: 'Update producer',
  [ORDER_EVENT_VALUES.TRACKING_CODE_CREATE]: 'Create tracking code',
};
