import avatar1 from 'images/avatar_1.jpg';
import avatar2 from 'images/avatar_2.jpg';
import avatar3 from 'images/avatar_3.jpg';
import post from 'images/post.png';

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

const blogsItems = [];

for (let i = 1; i < 20; i++) {
  blogsItems.push( {
    image: post,
    headerTitle: 'Design and Trends - 10 minute read',
    title: 'Must-Have Realistic Placeit Mockups That Will Boost Your Sales',
    content: 'This article will show you the best types of Placeit mockups and where to find them.'
  })
}

function getBlogs(params, successCallback, failureCallback) {
  successCallback({
    items: blogsItems,
    totalCount: blogsItems.length,
  });
}

export {
  getPosts,
  getBlogs,
}
