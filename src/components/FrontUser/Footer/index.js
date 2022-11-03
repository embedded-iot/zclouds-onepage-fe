import React from 'react';
import { WEBSITE_DOMAIN } from 'components/contants';

import './style.scss';

export default function Footer() {
  return (
    <div className="footer-wrapper">
      <div className='footer-contents'>
        <div>Dev by {WEBSITE_DOMAIN} | Điều khoản & Quy định | Chính sách bảo mật</div>
      </div>
    </div>
  );
}
