import React, { useEffect, useState } from 'react';
import { YoutubeOutlined, TableOutlined, LinkOutlined,
  OrderedListOutlined, SwapOutlined, DollarOutlined,
  BellOutlined, FacebookOutlined, UserOutlined,
  ContactsOutlined } from '@ant-design/icons';
import Sider, { getItem } from 'components/Share/Layout/Sider';
import { PostService, ProductService } from 'services';
import { ROUTERS, WEBSITE_DOMAIN } from 'components/contants';

import "./style.scss";

export default function UserSider({ redirectTo = () => {}, setGlobalStore = () => {} }) {
  const [products, setProducts] = useState(null);
  const [posts, setPosts] = useState(null);
  const getProducts = () => {
    ProductService.getProducts(response => {
      const productList = response.data.products.map(product => {
        return {
          ...product,
          key: product.type,
          services: product.services.map((service, serviceIndex) => {
            return ({
              ...service,
              key: `${ROUTERS.SERVICES}/${service.key}/${service.name}`,
            });
          })
        }
      })
      setProducts(productList);
      setGlobalStore({
        products: productList
      });
    })
  }
  const getPosts = () => {
    PostService.getPosts(response => {
      const postList = response.data.posts.map(post => {
        return ({
          ...post,
          key: `${ROUTERS.POSTS}/${post.key}/${post.name}`,
        });
      })
      setPosts(postList);
    })
  }
  useEffect(() => {
    getProducts();
    getPosts();
    // eslint-disable-next-line
  }, []);
  const productsItems = (products || []).map(product => {
    const servicesItems = product.services.map(service => {
      return getItem(service.name, service.key, <YoutubeOutlined />);
    })
    return getItem(product.name.toUpperCase(), product.key, undefined, servicesItems);
  })
  const postsItem = !!posts ? getItem('BÀI VIẾT', 'posts', undefined, posts.map(post => {
    return getItem(post.name, post.key);
  })) : {};
  const items = [
      ...productsItems,
    getItem('CHO THÀNH VIÊN', 'customer', undefined, [
      getItem('Lịch sử đơn hàng', ROUTERS.ORDERS_HISTORY, <OrderedListOutlined />),
      getItem( 'Lịch sử đơn nạp', ROUTERS.DEPOSITS_HISTORY, <SwapOutlined />),
      getItem('Bảng giá Cộng tác viên', ROUTERS.PRICES_FOR_PARTNER, <TableOutlined />),
      getItem('Tìm ID facebook', ROUTERS.FIND_FACEBOOK_ID, <LinkOutlined />),
      getItem('Kiếm tiền', ROUTERS.MAKE_MONEY, <DollarOutlined />),
      getItem('Thông báo', ROUTERS.NOTIFICATION, <BellOutlined />),
    ]),
    getItem('LIÊN HỆ', 'contacts', undefined, [
      getItem(`Fanpage ${WEBSITE_DOMAIN}`, ROUTERS.FB_PAGE, <FacebookOutlined />),
      getItem( `Admin ${WEBSITE_DOMAIN}`, ROUTERS.FB_ADMIN, <UserOutlined />),
      getItem('Liên hệ', ROUTERS.CONTACT_INFO, <ContactsOutlined />),
    ]),
    postsItem,
  ];
  const defaultOpenKeys = items.map(item => item.key);
  const defaultSelectedKeys = []

  const onClick = (e) => {
    switch (e.key) {
      case ROUTERS.FB_PAGE:
        window.open('https://www.facebook.com/FanpageLike68/?ref=website', '_blank');
        break;
      case ROUTERS.FB_ADMIN:
        window.open('https://www.facebook.com/mr.QuocDoan','_blank');
        break;
      default:
        redirectTo(e.key);
    }
  };
  return (
    !!products && !!posts ? <Sider items={items}
           defaultOpenKeys={defaultOpenKeys}
           defaultSelectedKeys={defaultSelectedKeys}
           onClick={onClick}
    /> : ''
  );
}
