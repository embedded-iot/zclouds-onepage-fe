import React from 'react';
import { WEBSITE_DOMAIN } from 'components/contants';

import 'components/FrontUser/Footer/style.scss';
import { Divider } from 'antd';

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <div className='footer-contents'>
        <div>Hệ thống hoạt động 24/24. Nhân viên hỗ trợ 09-18h từ T2-T7</div>
        <Divider/>
        <div>Dev by {WEBSITE_DOMAIN} | Điều khoản & Quy định | Chính sách bảo mật</div>
      </div>
    </div>
  );
}
