import avatar from 'images/avatar.png';

const items = [
  {
    content: '‘’Còn gì vui hơn khi LODY nhận được những lời feedback chân thực nhất của khách hàng về sản phẩm thời trang đồ da. Đó hoàn toàn là niềm vinh dự và cũng trở’’',
    avatar: avatar,
    name: 'Lubos Volkov',
    work: 'Lead designer at Toptal'
  },
  {
    content: '‘’Còn gì vui hơn khi LODY nhận được những lời feedback chân thực nhất của khách hàng về sản phẩm thời trang đồ da. Đó hoàn toàn là niềm vinh dự và cũng trở thành động lực giúp LODY cố gắng hơn’’',
    avatar: avatar,
    name: 'Lubos Volkov',
    work: 'Lead designer at Toptal'
  },
  {
    content: '‘’Còn gì vui hơn khi LODY nhận được những lời feedback chân thực nhất của khách hàng về sản phẩm thời trang đồ da’’',
    avatar: avatar,
    name: 'Lubos Volkov',
    work: 'Lead designer at Toptal'
  },
];

function getPosts(params, successCallback, failureCallback) {
  successCallback({
    items: items,
    totalCount: 30,
  });
}

export {
  getPosts,
}
