import avatar1 from 'images/avatar_1.jpg';
import avatar2 from 'images/avatar_2.jpg';
import avatar3 from 'images/avatar_3.jpg';
import post from 'images/post.png';
import { getFrontUserBaseURL, getFullPathImage } from 'services/BaseService';
import { datetime, makeGetWithConfigs } from 'utils';
import { DATE_FORMAT } from 'components/contants';

const items = [
  {
    content: '“I have to tell you that you are probably one of the best print-on-demand companies out there and they appreciate how you keep prices reasonable and shipping fees low, which is very important. Their customer service staffs are great. Just wanted to let you know that your zippered fleece hoodie is the warmest, softest, most comfortable hoodie I\'ve ever worn in my life.”',
    avatar: avatar1,
    name: 'Nguyen Minh Phuong',
    work: 'Seller'
  },
  {
    content: 'CS- fulfillment is my favorite for online shippnig. The sewing is improved after some initial models had some loose threads at the seams. Shipping times have improved and I mostly receive my items about two weeks after I place my order. My orders are only delivered to the United States. Products and services from CS-fulfillment are of good quality',
    avatar: avatar2,
    name: 'Pham Thi Thu',
    work: 'Seller'
  },
  {
    content: '“I have to say CS- fulfillment is one of the best on-demand companies out there and I appreciate how you keep your prices competitive and shipping fees low. The support team is impressive. They care about all that I need “',
    avatar: avatar3,
    name: 'Tran Thanh My',
    work: 'Seller'
  },
];

function getPosts(params, successCallback, failureCallback) {
  const { pageNum, pageSize } = params;
  successCallback({
    items: items.filter((item, index) => Math.floor(index / pageSize) === (pageNum - 1) ),
    totalCount: items.length,
  });
}

const transformBlog = item => {
  const convertedUpdatedDate = !!item.updatedTime ? datetime.convert(item.updatedTime, DATE_FORMAT) : '';
  return {
    ...item,
    image: getFullPathImage(item.featureImage) || post,
    headerTitle: `${item.blogCategory ? item.blogCategory.name : '-'} - ${convertedUpdatedDate}`,
    title: item.title,
    description: item.description,
    content: item.content,
  }
}

function getBlogs(params, successCallback, failureCallback) {
  const config = {
    params
  };
  const url = getFrontUserBaseURL() + '/blogs';
  makeGetWithConfigs(url, config, successCallback, failureCallback, response => {
    const items = response.content.map(transformBlog)
    return {
      items: items,
      totalCount: response.totalElement,
      pageNum: response.currentPage,
      totalPage: response.totalPage,
    };
  });
}
function getBlog(id, successCallback, failureCallback) {
  const url = getFrontUserBaseURL() + '/blogs/' + id;
  makeGetWithConfigs(url, {}, successCallback, failureCallback, transformBlog);
}

export {
  getPosts,
  getBlogs,
  getBlog,
}
