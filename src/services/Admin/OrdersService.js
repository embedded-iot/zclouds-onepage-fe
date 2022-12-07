import { getFullPathImage, getAdminBaseURL } from 'services/BaseService';
import { datetime, format, makeGetWithConfigs, makePostWithConfigs } from 'utils';
import shirt_sku from 'images/t-shirt_sku.svg';
import { DATE_FORMAT, STATE_LABELS } from 'components/contants';

const transformOrder = item => {
  const convertedMockupUrl = !!item.mockupUrl && getFullPathImage(item.mockupUrl);
  const convertedDesignUrl = !!item.designUrl && getFullPathImage(item.designUrl);
  return {
    ...item,
    convertedCreatedDate: !!item.dateOrder ? datetime.convert(item.dateOrder, DATE_FORMAT) : '',
    quantity: item.quantity || 0,
    mockupUrl: convertedMockupUrl || '',
    designUrl: convertedDesignUrl || '',
    convertedMockupUrl: convertedMockupUrl || shirt_sku,
    convertedDesignUrl: convertedDesignUrl || shirt_sku,
    convertedProductPrice: format.formatCurrency(item.productPrice || 0),
    convertedPriceTotal: format.formatCurrency(item.totalPrice || 0),
    convertedStatus: STATE_LABELS[item.status] || item.status,
    customerFullName: item.orderShipping && item.orderShipping.fullName ,
  };
}

const ordersItems = [
  {
    "id": 23,
    "productId": 1,
    "productPrice": 10000,
    "productName": "sdasd",
    "productInfoVariant": null,
    "orderProductSku": "1",
    "quantity": 0,
    "totalPrice": null,
    "currency": null,
    "mockupUrl": "/uploads/designs/13/522647a1-04f9-42ac-92b2-3ca5abe5a891.jpg",
    "designUrl": "/uploads/designs/13/e2f6537f-6b47-423d-9eed-e63e12a6baa5.jpg",
    "designId": null,
    "design": null,
    "storeId": 10,
    "store": {
      "id": 10,
      "name": "Shopbase 22",
      "domain": "https://namnguyen.onshopbase.com",
      "apiKey": "bb179d548a5655b6cd58f5c0adcdec51",
      "password": "89fb338f1b320590a0f025ced9fe55858516538b53e18bb03b53a5aff89a5061",
      "secret": "f75219344f2e477aa7d637ca517192d6",
      "platform": "SHOPBASE",
      "autoSyncOrder": true,
      "autoApproveOrder": true,
      "autoSyncTracking": true,
      "userId": 4
    },
    "dateOrder": 1639681153000,
    "orderNumber": "STS2371-13440025",
    "orderNote": "ádasd",
    "status": "ALERT",
    "shippingStatus": null,
    "orderShipping": {
      "id": 25,
      "orderId": 23,
      "fullName": "Jasmine Gindlesperger",
      "phoneNumber": null,
      "address1": "9325, 11th St NE",
      "address2": null,
      "country": "United States",
      "zipCode": "98258",
      "region": "Washington",
      "city": "Lake Stevens"
    },
    "platform": "SHOPBASE",
    "platformOrderId": 13440025,
    "platformOrderStatus": null,
    "platformOrderItemId": null,
    "userId": 4
  },
  {
    "id": 17,
    "productId": 35,
    "productPrice": 27.99,
    "productName": "as",
    "productInfoVariant": null,
    "orderProductSku": "35",
    "quantity": 1,
    "totalPrice": 27.99,
    "currency": null,
    "mockupUrl": "/uploads/designs/14/7ef3cb25-290d-4929-8103-010bea94fa2a.png",
    "designUrl": "/uploads/designs/14/e1116f8e-875b-4106-b6df-567b84c0ff88.png",
    "designId": 11,
    "design": {
      "id": 11,
      "slug": "sadsascascasc",
      "type": "3D",
      "userId": 7,
      "designDetails": []
    },
    "storeId": 10,
    "store": {
      "id": 10,
      "name": "Shopbase 22",
      "domain": "https://namnguyen.onshopbase.com",
      "apiKey": "bb179d548a5655b6cd58f5c0adcdec51",
      "password": "89fb338f1b320590a0f025ced9fe55858516538b53e18bb03b53a5aff89a5061",
      "secret": "f75219344f2e477aa7d637ca517192d6",
      "platform": "SHOPBASE",
      "autoSyncOrder": true,
      "autoApproveOrder": true,
      "autoSyncTracking": true,
      "userId": 4
    },
    "dateOrder": 1669610315000,
    "orderNumber": "ssss",
    "orderNote": "sas",
    "status": "TRANSIT",
    "shippingStatus": null,
    "orderShipping": {
      "id": 18,
      "orderId": 17,
      "fullName": "34",
      "phoneNumber": null,
      "address1": "34",
      "address2": "34",
      "country": "34",
      "zipCode": null,
      "region": null,
      "city": "34"
    },
    "platform": "SYSTEM",
    "platformOrderId": null,
    "platformOrderStatus": null,
    "platformOrderItemId": null,
    "userId": 4
  },
  {
    "id": 16,
    "productId": 34,
    "productPrice": 1,
    "productName": "test-a",
    "productInfoVariant": null,
    "orderProductSku": "34",
    "quantity": 22,
    "totalPrice": 22,
    "currency": null,
    "mockupUrl": "https://c8.alamy.com/comp/R0NBD0/tailor-dummy-fashion-icon-on-white-background-atelier-designer-constructor-dressmaker-object-black-couture-symbol-silhouette-white-background-v-R0NBD0.jpg",
    "designUrl": "https://c8.alamy.com/comp/R0NBD0/tailor-dummy-fashion-icon-on-white-background-atelier-designer-constructor-dressmaker-object-black-couture-symbol-silhouette-white-background-v-R0NBD0.jpg",
    "designId": null,
    "design": null,
    "storeId": 10,
    "store": {
      "id": 10,
      "name": "Shopbase 22",
      "domain": "https://namnguyen.onshopbase.com",
      "apiKey": "bb179d548a5655b6cd58f5c0adcdec51",
      "password": "89fb338f1b320590a0f025ced9fe55858516538b53e18bb03b53a5aff89a5061",
      "secret": "f75219344f2e477aa7d637ca517192d6",
      "platform": "SHOPBASE",
      "autoSyncOrder": true,
      "autoApproveOrder": true,
      "autoSyncTracking": true,
      "userId": 4
    },
    "dateOrder": 1669606004000,
    "orderNumber": "ss",
    "orderNote": "s",
    "status": "PENDING",
    "shippingStatus": null,
    "orderShipping": {
      "id": 14,
      "orderId": 16,
      "fullName": "s",
      "phoneNumber": "s",
      "address1": "s",
      "address2": "s",
      "country": "d",
      "zipCode": "s",
      "region": "s",
      "city": "s"
    },
    "platform": "SYSTEM",
    "platformOrderId": null,
    "platformOrderStatus": null,
    "platformOrderItemId": null,
    "userId": 4
  },
  {
    "id": 15,
    "productId": 35,
    "productPrice": 27.99,
    "productName": "hoodie dep",
    "productInfoVariant": null,
    "orderProductSku": "35",
    "quantity": 212,
    "totalPrice": 5933.88,
    "currency": null,
    "mockupUrl": "/uploads/designs/12/dbebb985-562a-4ebd-8d11-fdcf9dafe4db.png",
    "designUrl": "/uploads/designs/12/d2ae0cdf-c3b5-4716-9129-24d575e1f823.png",
    "designId": null,
    "design": null,
    "storeId": 10,
    "store": {
      "id": 10,
      "name": "Shopbase 22",
      "domain": "https://namnguyen.onshopbase.com",
      "apiKey": "bb179d548a5655b6cd58f5c0adcdec51",
      "password": "89fb338f1b320590a0f025ced9fe55858516538b53e18bb03b53a5aff89a5061",
      "secret": "f75219344f2e477aa7d637ca517192d6",
      "platform": "SHOPBASE",
      "autoSyncOrder": true,
      "autoApproveOrder": true,
      "autoSyncTracking": true,
      "userId": 4
    },
    "dateOrder": 1669605074000,
    "orderNumber": "ứdfsdfsdf",
    "orderNote": "sadasdasda",
    "status": "PENDING",
    "shippingStatus": null,
    "orderShipping": {
      "id": 13,
      "orderId": 15,
      "fullName": "ádasdasdad",
      "phoneNumber": null,
      "address1": "dádas",
      "address2": "ad",
      "country": "ádasd",
      "zipCode": "ádasd",
      "region": "ádadd",
      "city": "ádasd"
    },
    "platform": "SYSTEM",
    "platformOrderId": null,
    "platformOrderStatus": null,
    "platformOrderItemId": null,
    "userId": 4
  },
  {
    "id": 14,
    "productId": 34,
    "productPrice": 1,
    "productName": "test-a",
    "productInfoVariant": null,
    "orderProductSku": "34",
    "quantity": 22,
    "totalPrice": 53315.9,
    "currency": null,
    "mockupUrl": "http://localhost:3000/orders/0",
    "designUrl": "http://localhost:3000/orders/0",
    "designId": 13,
    "design": {
      "id": 13,
      "slug": "huyyyy19945",
      "type": "3D",
      "userId": 7,
      "designDetails": [
        {
          "id": 21,
          "url": "/uploads/designs/13/e2f6537f-6b47-423d-9eed-e63e12a6baa5.jpg",
          "systemPath": "/uploads/designs/13/e2f6537f-6b47-423d-9eed-e63e12a6baa5.jpg",
          "size": 9,
          "displayOrder": 1,
          "type": "MOCKUP",
          "storageType": "FileSystem",
          "designId": 13
        },
        {
          "id": 22,
          "url": "/uploads/designs/13/522647a1-04f9-42ac-92b2-3ca5abe5a891.jpg",
          "systemPath": "/uploads/designs/13/522647a1-04f9-42ac-92b2-3ca5abe5a891.jpg",
          "size": 9,
          "displayOrder": 1,
          "type": "DESIGN",
          "storageType": "FileSystem",
          "designId": 13
        }
      ]
    },
    "storeId": 10,
    "store": {
      "id": 10,
      "name": "Shopbase 22",
      "domain": "https://namnguyen.onshopbase.com",
      "apiKey": "bb179d548a5655b6cd58f5c0adcdec51",
      "password": "89fb338f1b320590a0f025ced9fe55858516538b53e18bb03b53a5aff89a5061",
      "secret": "f75219344f2e477aa7d637ca517192d6",
      "platform": "SHOPBASE",
      "autoSyncOrder": true,
      "autoApproveOrder": true,
      "autoSyncTracking": true,
      "userId": 4
    },
    "dateOrder": 1669565052000,
    "orderNumber": "ss",
    "orderNote": "s",
    "status": "PENDING",
    "shippingStatus": null,
    "orderShipping": {
      "id": 12,
      "orderId": 14,
      "fullName": "ss",
      "phoneNumber": "ss",
      "address1": "ss",
      "address2": "á",
      "country": "ss",
      "zipCode": "ss",
      "region": "ád",
      "city": "ss"
    },
    "platform": "SYSTEM",
    "platformOrderId": null,
    "platformOrderStatus": null,
    "platformOrderItemId": null,
    "userId": 4
  },
  {
    "id": 13,
    "productId": 35,
    "productPrice": 27.99,
    "productName": "sdasd",
    "productInfoVariant": null,
    "orderProductSku": "35|m",
    "quantity": 1212,
    "totalPrice": 53315.9,
    "currency": null,
    "mockupUrl": "https://fulfill.zclouds.vn/static/media/t-shirt_sku.b6e7a9b7895e896d9cfd80444a3299fc.svg",
    "designUrl": "https://fulfill.zclouds.vn/static/media/t-shirt_sku.b6e7a9b7895e896d9cfd80444a3299fc.svg",
    "designId": 13,
    "design": {
      "id": 13,
      "slug": "huyyyy19945",
      "type": "3D",
      "userId": 7,
      "designDetails": [
        {
          "id": 21,
          "url": "/uploads/designs/13/e2f6537f-6b47-423d-9eed-e63e12a6baa5.jpg",
          "systemPath": "/uploads/designs/13/e2f6537f-6b47-423d-9eed-e63e12a6baa5.jpg",
          "size": 9,
          "displayOrder": 1,
          "type": "MOCKUP",
          "storageType": "FileSystem",
          "designId": 13
        },
        {
          "id": 22,
          "url": "/uploads/designs/13/522647a1-04f9-42ac-92b2-3ca5abe5a891.jpg",
          "systemPath": "/uploads/designs/13/522647a1-04f9-42ac-92b2-3ca5abe5a891.jpg",
          "size": 9,
          "displayOrder": 1,
          "type": "DESIGN",
          "storageType": "FileSystem",
          "designId": 13
        }
      ]
    },
    "storeId": 10,
    "store": {
      "id": 10,
      "name": "Shopbase 22",
      "domain": "https://namnguyen.onshopbase.com",
      "apiKey": "bb179d548a5655b6cd58f5c0adcdec51",
      "password": "89fb338f1b320590a0f025ced9fe55858516538b53e18bb03b53a5aff89a5061",
      "secret": "f75219344f2e477aa7d637ca517192d6",
      "platform": "SHOPBASE",
      "autoSyncOrder": true,
      "autoApproveOrder": true,
      "autoSyncTracking": true,
      "userId": 4
    },
    "dateOrder": 1669565052000,
    "orderNumber": "sss",
    "orderNote": "sss",
    "status": "PENDING",
    "shippingStatus": null,
    "orderShipping": {
      "id": 11,
      "orderId": 13,
      "fullName": "ss",
      "phoneNumber": "ss",
      "address1": "ss",
      "address2": "á",
      "country": "ss",
      "zipCode": "ss",
      "region": "ád",
      "city": "ss"
    },
    "platform": "SYSTEM",
    "platformOrderId": null,
    "platformOrderStatus": null,
    "platformOrderItemId": null,
    "userId": 4
  },
  {
    "id": 12,
    "productId": 35,
    "productPrice": 27.99,
    "productName": "sdasd",
    "productInfoVariant": null,
    "orderProductSku": "35|m",
    "quantity": 1212,
    "totalPrice": 53315.9,
    "currency": null,
    "mockupUrl": "https://fulfill.zclouds.vn/static/media/t-shirt_sku.b6e7a9b7895e896d9cfd80444a3299fc.svg",
    "designUrl": "https://fulfill.zclouds.vn/static/media/t-shirt_sku.b6e7a9b7895e896d9cfd80444a3299fc.svg",
    "designId": 13,
    "design": {
      "id": 13,
      "slug": "huyyyy19945",
      "type": "3D",
      "userId": 7,
      "designDetails": [
        {
          "id": 21,
          "url": "/uploads/designs/13/e2f6537f-6b47-423d-9eed-e63e12a6baa5.jpg",
          "systemPath": "/uploads/designs/13/e2f6537f-6b47-423d-9eed-e63e12a6baa5.jpg",
          "size": 9,
          "displayOrder": 1,
          "type": "MOCKUP",
          "storageType": "FileSystem",
          "designId": 13
        },
        {
          "id": 22,
          "url": "/uploads/designs/13/522647a1-04f9-42ac-92b2-3ca5abe5a891.jpg",
          "systemPath": "/uploads/designs/13/522647a1-04f9-42ac-92b2-3ca5abe5a891.jpg",
          "size": 9,
          "displayOrder": 1,
          "type": "DESIGN",
          "storageType": "FileSystem",
          "designId": 13
        }
      ]
    },
    "storeId": 10,
    "store": {
      "id": 10,
      "name": "Shopbase 22",
      "domain": "https://namnguyen.onshopbase.com",
      "apiKey": "bb179d548a5655b6cd58f5c0adcdec51",
      "password": "89fb338f1b320590a0f025ced9fe55858516538b53e18bb03b53a5aff89a5061",
      "secret": "f75219344f2e477aa7d637ca517192d6",
      "platform": "SHOPBASE",
      "autoSyncOrder": true,
      "autoApproveOrder": true,
      "autoSyncTracking": true,
      "userId": 4
    },
    "dateOrder": 1669565052000,
    "orderNumber": "sss",
    "orderNote": "sss",
    "status": "DELIVERED",
    "shippingStatus": null,
    "orderShipping": {
      "id": 10,
      "orderId": 12,
      "fullName": "ss",
      "phoneNumber": "ss",
      "address1": "ss",
      "address2": "á",
      "country": "ss",
      "zipCode": "ss",
      "region": "ád",
      "city": "ss"
    },
    "platform": "SYSTEM",
    "platformOrderId": null,
    "platformOrderStatus": null,
    "platformOrderItemId": null,
    "userId": 4
  },
  {
    "id": 11,
    "productId": 35,
    "productPrice": 27.99,
    "productName": "sdasd",
    "productInfoVariant": null,
    "orderProductSku": "35|m",
    "quantity": 1212,
    "totalPrice": 53315.9,
    "currency": null,
    "mockupUrl": "https://fulfill.zclouds.vn/static/media/t-shirt_sku.b6e7a9b7895e896d9cfd80444a3299fc.svg",
    "designUrl": "https://fulfill.zclouds.vn/static/media/t-shirt_sku.b6e7a9b7895e896d9cfd80444a3299fc.svg",
    "designId": 13,
    "design": {
      "id": 13,
      "slug": "huyyyy19945",
      "type": "3D",
      "userId": 7,
      "designDetails": [
        {
          "id": 21,
          "url": "/uploads/designs/13/e2f6537f-6b47-423d-9eed-e63e12a6baa5.jpg",
          "systemPath": "/uploads/designs/13/e2f6537f-6b47-423d-9eed-e63e12a6baa5.jpg",
          "size": 9,
          "displayOrder": 1,
          "type": "MOCKUP",
          "storageType": "FileSystem",
          "designId": 13
        },
        {
          "id": 22,
          "url": "/uploads/designs/13/522647a1-04f9-42ac-92b2-3ca5abe5a891.jpg",
          "systemPath": "/uploads/designs/13/522647a1-04f9-42ac-92b2-3ca5abe5a891.jpg",
          "size": 9,
          "displayOrder": 1,
          "type": "DESIGN",
          "storageType": "FileSystem",
          "designId": 13
        }
      ]
    },
    "storeId": 10,
    "store": {
      "id": 10,
      "name": "Shopbase 22",
      "domain": "https://namnguyen.onshopbase.com",
      "apiKey": "bb179d548a5655b6cd58f5c0adcdec51",
      "password": "89fb338f1b320590a0f025ced9fe55858516538b53e18bb03b53a5aff89a5061",
      "secret": "f75219344f2e477aa7d637ca517192d6",
      "platform": "SHOPBASE",
      "autoSyncOrder": true,
      "autoApproveOrder": true,
      "autoSyncTracking": true,
      "userId": 4
    },
    "dateOrder": 1669565052000,
    "orderNumber": "sss",
    "orderNote": "sss",
    "status": "PENDING",
    "shippingStatus": null,
    "orderShipping": {
      "id": 9,
      "orderId": 11,
      "fullName": "ss",
      "phoneNumber": "ss",
      "address1": "ss",
      "address2": "á",
      "country": "ss",
      "zipCode": "ss",
      "region": "ád",
      "city": "ss"
    },
    "platform": "SYSTEM",
    "platformOrderId": null,
    "platformOrderStatus": null,
    "platformOrderItemId": null,
    "userId": 4
  },
  {
    "id": 10,
    "productId": 35,
    "productPrice": 27.99,
    "productName": "sdasd",
    "productInfoVariant": null,
    "orderProductSku": "35|m",
    "quantity": 1212,
    "totalPrice": 53315.9,
    "currency": null,
    "mockupUrl": "https://fulfill.zclouds.vn/static/media/t-shirt_sku.b6e7a9b7895e896d9cfd80444a3299fc.svg",
    "designUrl": "https://fulfill.zclouds.vn/static/media/t-shirt_sku.b6e7a9b7895e896d9cfd80444a3299fc.svg",
    "designId": 13,
    "design": {
      "id": 13,
      "slug": "huyyyy19945",
      "type": "3D",
      "userId": 7,
      "designDetails": [
        {
          "id": 21,
          "url": "/uploads/designs/13/e2f6537f-6b47-423d-9eed-e63e12a6baa5.jpg",
          "systemPath": "/uploads/designs/13/e2f6537f-6b47-423d-9eed-e63e12a6baa5.jpg",
          "size": 9,
          "displayOrder": 1,
          "type": "MOCKUP",
          "storageType": "FileSystem",
          "designId": 13
        },
        {
          "id": 22,
          "url": "/uploads/designs/13/522647a1-04f9-42ac-92b2-3ca5abe5a891.jpg",
          "systemPath": "/uploads/designs/13/522647a1-04f9-42ac-92b2-3ca5abe5a891.jpg",
          "size": 9,
          "displayOrder": 1,
          "type": "DESIGN",
          "storageType": "FileSystem",
          "designId": 13
        }
      ]
    },
    "storeId": 10,
    "store": {
      "id": 10,
      "name": "Shopbase 22",
      "domain": "https://namnguyen.onshopbase.com",
      "apiKey": "bb179d548a5655b6cd58f5c0adcdec51",
      "password": "89fb338f1b320590a0f025ced9fe55858516538b53e18bb03b53a5aff89a5061",
      "secret": "f75219344f2e477aa7d637ca517192d6",
      "platform": "SHOPBASE",
      "autoSyncOrder": true,
      "autoApproveOrder": true,
      "autoSyncTracking": true,
      "userId": 4
    },
    "dateOrder": 1669565052000,
    "orderNumber": "sss",
    "orderNote": "sss",
    "status": "PENDING",
    "shippingStatus": null,
    "orderShipping": {
      "id": 8,
      "orderId": 10,
      "fullName": "ss",
      "phoneNumber": "ss",
      "address1": "ss",
      "address2": "á",
      "country": "ss",
      "zipCode": "ss",
      "region": "ád",
      "city": "ss"
    },
    "platform": "SYSTEM",
    "platformOrderId": null,
    "platformOrderStatus": null,
    "platformOrderItemId": null,
    "userId": 4
  },
  {
    "id": 9,
    "productId": 35,
    "productPrice": 27.99,
    "productName": "sdasd",
    "productInfoVariant": null,
    "orderProductSku": "35|m",
    "quantity": 1212,
    "totalPrice": 53315.9,
    "currency": null,
    "mockupUrl": "https://fulfill.zclouds.vn/static/media/t-shirt_sku.b6e7a9b7895e896d9cfd80444a3299fc.svg",
    "designUrl": "https://fulfill.zclouds.vn/static/media/t-shirt_sku.b6e7a9b7895e896d9cfd80444a3299fc.svg",
    "designId": 13,
    "design": {
      "id": 13,
      "slug": "huyyyy19945",
      "type": "3D",
      "userId": 7,
      "designDetails": [
        {
          "id": 21,
          "url": "/uploads/designs/13/e2f6537f-6b47-423d-9eed-e63e12a6baa5.jpg",
          "systemPath": "/uploads/designs/13/e2f6537f-6b47-423d-9eed-e63e12a6baa5.jpg",
          "size": 9,
          "displayOrder": 1,
          "type": "MOCKUP",
          "storageType": "FileSystem",
          "designId": 13
        },
        {
          "id": 22,
          "url": "/uploads/designs/13/522647a1-04f9-42ac-92b2-3ca5abe5a891.jpg",
          "systemPath": "/uploads/designs/13/522647a1-04f9-42ac-92b2-3ca5abe5a891.jpg",
          "size": 9,
          "displayOrder": 1,
          "type": "DESIGN",
          "storageType": "FileSystem",
          "designId": 13
        }
      ]
    },
    "storeId": 10,
    "store": {
      "id": 10,
      "name": "Shopbase 22",
      "domain": "https://namnguyen.onshopbase.com",
      "apiKey": "bb179d548a5655b6cd58f5c0adcdec51",
      "password": "89fb338f1b320590a0f025ced9fe55858516538b53e18bb03b53a5aff89a5061",
      "secret": "f75219344f2e477aa7d637ca517192d6",
      "platform": "SHOPBASE",
      "autoSyncOrder": true,
      "autoApproveOrder": true,
      "autoSyncTracking": true,
      "userId": 4
    },
    "dateOrder": 1669565052000,
    "orderNumber": "sss",
    "orderNote": "sss",
    "status": "PENDING",
    "shippingStatus": null,
    "orderShipping": {
      "id": 7,
      "orderId": 9,
      "fullName": "ss",
      "phoneNumber": "ss",
      "address1": "ss",
      "address2": "á",
      "country": "ss",
      "zipCode": "ss",
      "region": "ád",
      "city": "ss"
    },
    "platform": "SYSTEM",
    "platformOrderId": null,
    "platformOrderStatus": null,
    "platformOrderItemId": null,
    "userId": 4
  },
  {
    "id": 7,
    "productId": 1,
    "productPrice": 10000,
    "productName": null,
    "productInfoVariant": null,
    "orderProductSku": null,
    "quantity": null,
    "totalPrice": null,
    "currency": null,
    "mockupUrl": null,
    "designUrl": null,
    "designId": null,
    "design": null,
    "storeId": 10,
    "store": {
      "id": 10,
      "name": "Shopbase 22",
      "domain": "https://namnguyen.onshopbase.com",
      "apiKey": "bb179d548a5655b6cd58f5c0adcdec51",
      "password": "89fb338f1b320590a0f025ced9fe55858516538b53e18bb03b53a5aff89a5061",
      "secret": "f75219344f2e477aa7d637ca517192d6",
      "platform": "SHOPBASE",
      "autoSyncOrder": true,
      "autoApproveOrder": true,
      "autoSyncTracking": true,
      "userId": 4
    },
    "dateOrder": 1639785476000,
    "orderNumber": "STS2372-13463808",
    "orderNote": null,
    "status": "PENDING",
    "shippingStatus": null,
    "orderShipping": {
      "id": 5,
      "orderId": 7,
      "fullName": "Dane Walter",
      "phoneNumber": "",
      "address1": "213, Presidential Dr",
      "address2": "C",
      "country": "United States",
      "zipCode": "19807",
      "region": "Delaware",
      "city": "Wilmington"
    },
    "platform": "SHOPBASE",
    "platformOrderId": 13463808,
    "platformOrderStatus": null,
    "platformOrderItemId": null,
    "userId": 4
  },
  {
    "id": 4,
    "productId": 9,
    "productPrice": 8.5,
    "productName": "sadasdasd",
    "productInfoVariant": null,
    "orderProductSku": null,
    "quantity": 2323,
    "totalPrice": null,
    "currency": null,
    "mockupUrl": "http://localhost:3000/orders/0",
    "designUrl": "http://localhost:3000/orders/0",
    "designId": null,
    "design": null,
    "storeId": 10,
    "store": {
      "id": 10,
      "name": "Shopbase 22",
      "domain": "https://namnguyen.onshopbase.com",
      "apiKey": "bb179d548a5655b6cd58f5c0adcdec51",
      "password": "89fb338f1b320590a0f025ced9fe55858516538b53e18bb03b53a5aff89a5061",
      "secret": "f75219344f2e477aa7d637ca517192d6",
      "platform": "SHOPBASE",
      "autoSyncOrder": true,
      "autoApproveOrder": true,
      "autoSyncTracking": true,
      "userId": 4
    },
    "dateOrder": null,
    "orderNumber": "sdasdasd",
    "orderNote": "ádasdasd",
    "status": "PENDING",
    "shippingStatus": null,
    "orderShipping": {
      "id": 2,
      "orderId": 4,
      "fullName": "ádasd",
      "phoneNumber": null,
      "address1": "ádasdasd",
      "address2": null,
      "country": "ádasd3223",
      "zipCode": null,
      "region": null,
      "city": "ádasdasd"
    },
    "platform": null,
    "platformOrderId": null,
    "platformOrderStatus": null,
    "platformOrderItemId": null,
    "userId": 4
  }
]

function getOrders(params, successCallback, failureCallback) {
  successCallback({
    items: ordersItems.map(transformOrder),
    totalCount: 12,
    pageNum: 1,
    totalPage: 1,
  })
  const config = {
    params
  };
  const url = getAdminBaseURL() + '/orders';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformOrder)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}

function updateOrderStatus(orderId, data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/orders/' + orderId + '/status';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function importOrders(data, successCallback, failureCallback) {
  const config = {
    data
  };
  const url = getAdminBaseURL() + '/orders/import';
  makePostWithConfigs(url, config, successCallback, failureCallback);
}

function getOrdersStatus(successCallback, failureCallback) {
  successCallback([{"status":"PENDING","orderCount":9},{"status":"DELIVERED","orderCount":1},{"status":"TRANSIT","orderCount":1},{"status":"ALERT","orderCount":1}]);
  const url = getAdminBaseURL() + '/orders/status';
  makeGetWithConfigs(url, {}, successCallback, failureCallback);
}

export {
  getOrders,
  getOrdersStatus,
  updateOrderStatus,
  importOrders,
}
