import React from 'react';
import { Alert, Col, Row, Typography } from 'antd';
import LoginBox from 'components/Share/LoginBox';
const { Text } = Typography;


export default function ProtectedBox({ isLogin = false, ísAdmin = false, redirectTo = () => {}, setGlobalStore = () => {}, children = '' }) {
  const alertMessage = (
    <Text type="danger" style={{fontWeight: 'bold'}}>
      Bạn cần đăng nhập để sử dụng chức năng này
    </Text>
  );
  return (
    <>
      {
        !isLogin && (
          <Row>
            <Col span={12}>
              <Alert message={alertMessage} type="error" />
              <LoginBox redirectTo={redirectTo}
                        setGlobalStore={setGlobalStore}/>
            </Col>
          </Row>
        )
      }
      { isLogin && <>{children}</> }
    </>

  );
}
