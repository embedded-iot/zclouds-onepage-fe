import React from 'react';
import { Card } from 'antd';
import { WEBSITE_DOMAIN } from 'components/contants';
import './style.scss';


export default function BannerBox() {
  return (
    <Card className="banner-box-wrapper" title={`${WEBSITE_DOMAIN} - Ổn định, hiệu quả, lâu dài`}>
      <p><b>{WEBSITE_DOMAIN}</b> hoạt động từ năm 2018 đến nay, với phương châm xây dựng một hệ thống mang đến lợi ích cho người sử dụng Facebook. Chúng tôi chỉ cung cấp các dịch vụ như tăng like, comment, share, view, tăng mắt, likepage, follow, instagram...và một số dịch vụ khác để hỗ trợ cá nhân được nhiều tương tác hơn, các shop bán hàng tốt và hiệu quả hơn.</p>
      Các dịch vụ khác như Hack nick facebook, report fanpage, đọc trộm tin nhắn, đánh giá xấu, dìm hàng... Like68 tuyệt đối không nhận
    </Card>
  );
}
