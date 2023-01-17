import avatar from 'images/avatar.png';
import post from 'images/post.png';

const items = [
  {
    content: '‘’Còn gì vui hơn khi LODY nhận được những lời feedback chân thực nhất của khách hàng về sản phẩm thời trang đồ da. Đó hoàn toàn là niềm vinh dự và cũng trở’’',
    avatar: avatar,
    name: 'Lubos Volkov 1',
    work: 'Lead designer at Toptal'
  },
  {
    content: '‘’Còn gì vui hơn khi LODY nhận được những lời feedback chân thực nhất của khách hàng về sản phẩm thời trang đồ da. Đó hoàn toàn là niềm vinh dự và cũng trở thành động lực giúp LODY cố gắng hơn’’',
    avatar: avatar,
    name: 'Lubos Volkov 2',
    work: 'Lead designer at Toptal'
  },
  {
    content: '‘’Còn gì vui hơn khi LODY nhận được những lời feedback chân thực nhất của khách hàng về sản phẩm thời trang đồ da’’',
    avatar: avatar,
    name: 'Lubos Volkov 3',
    work: 'Lead designer at Toptal'
  },
  {
    content: '‘’Còn gì vui hơn khi LODY nhận được những lời feedback chân thực nhất của khách hàng về sản phẩm thời trang đồ da. Đó hoàn toàn là niềm vinh dự và cũng trở’’',
    avatar: avatar,
    name: 'Lubos Volkov 4',
    work: 'Lead designer at Toptal'
  },
  {
    content: '‘’Còn gì vui hơn khi LODY nhận được những lời feedback chân thực nhất của khách hàng về sản phẩm thời trang đồ da. Đó hoàn toàn là niềm vinh dự và cũng trở thành động lực giúp LODY cố gắng hơn’’',
    avatar: avatar,
    name: 'Lubos Volkov 5',
    work: 'Lead designer at Toptal'
  },
  {
    content: '‘’Còn gì vui hơn khi LODY nhận được những lời feedback chân thực nhất của khách hàng về sản phẩm thời trang đồ da’’',
    avatar: avatar,
    name: 'Lubos Volkov 6',
    work: 'Lead designer at Toptal'
  },{
    content: '‘’Còn gì vui hơn khi LODY nhận được những lời feedback chân thực nhất của khách hàng về sản phẩm thời trang đồ da. Đó hoàn toàn là niềm vinh dự và cũng trở’’',
    avatar: avatar,
    name: 'Lubos Volkov 7',
    work: 'Lead designer at Toptal'
  },
  {
    content: '‘’Còn gì vui hơn khi LODY nhận được những lời feedback chân thực nhất của khách hàng về sản phẩm thời trang đồ da. Đó hoàn toàn là niềm vinh dự và cũng trở thành động lực giúp LODY cố gắng hơn’’',
    avatar: avatar,
    name: 'Lubos Volkov 8',
    work: 'Lead designer at Toptal'
  },
  {
    content: '‘’Còn gì vui hơn khi LODY nhận được những lời feedback chân thực nhất của khách hàng về sản phẩm thời trang đồ da’’',
    avatar: avatar,
    name: 'Lubos Volkov 9',
    work: 'Lead designer at Toptal'
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
