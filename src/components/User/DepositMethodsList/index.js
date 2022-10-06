import React from 'react';
import { Button, Card, Col, Row, Typography } from 'antd';
import { WEBSITE_NAME } from 'components/contants';

import './style.scss';

const { Text } = Typography;

export default function DepositMethodsList({ userInfo = {}}) {
  const items = [
    {
      title: "1. NẠP QUA NGÂN HÀNG",
      content: (
        <>
          Nội dung chuyển khoản:<br/>
          <div className="highlight-box">
            <Text type="danger" style={{background: '#fff'}}>{`${WEBSITE_NAME} ${userInfo.name || ''}`}</Text>
          </div>
          <br/>
          Vietcombank: 1988797979<br/>
          VPBank: 889922222 (bắt buộc nạp trên 50k)<br/>
          MBBank: 8899992468 (MB thường xử lý chậm 15-30p)<br/>
          Chủ tài khoản: ĐOÀN MINH QUỐC<br/>
          Nạp tự động, ghi đúng nội dung tiền vào sau 3-5 phút
        </>
      ),
    },
    {
      title: "2. NẠP BẰNG THẺ CÀO MOBI, VINA, VIETTEL",
      content: (
        <>
          <Button type="primary" size="large">Nạp ngay</Button><br/>
          Nạp bằng thẻ điện thoại nhà mạng sẽ trừ phí 30%.<br/>
          Nạp 10k nhận 7k<br/>
          Nạp 100k nhận 70k<br/>
          Nạp 1000k nhận 700k<br/>
          Nạp tự động, tiền vào 2-3p sau khi nạp
        </>
      ),
    },
    {
      title: "3. NẠP QUA PAYPAL",
      content: (
        <>
          Nội dung chuyển khoản:<br/>
          <div className="highlight-box">
            <Text type="danger" style={{background: '#fff'}}>{`${WEBSITE_NAME} ${userInfo.name || ''}`}</Text>
          </div>
          <br/>
          Min nạp 10$, nạp dưới 10$ không xử lý (tỉ giá 1$ = 22.000đ)<br/>
          Email Paypal: doanminhquocvn@gmail.com<br/>
          Paypal chuyển hình thức cho bạn bè để không mất phí, chuyển xong nhắn tin báo Admin kiểm tra<br/>
          Nạp tay, hỗ trợ nạp giờ hành chính
        </>
      ),
    },
    {
      title: "4. MOMO",
      content: (
        <>
          - Không nhận chuyển qua Momo<br/>
          - Chuyển từ Momo qua ngân hàng sẽ bị lỗi không nạp tự động được
        </>
      ),
    },
  ];
  return (
    <div className="deposit-method-wrapper">
      <Row gutter={16}>
        {
          items.map((item, index) => (
            <Col span={12} key={index} style={{marginBottom: '20px'}}>
              <Card title={item.title.toUpperCase()} style={{ background: '#fafafa'}}>
                {item.content}
              </Card>
            </Col>
          ))
        }
      </Row>
    </div>
  )
}
