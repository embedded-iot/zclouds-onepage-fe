import React, { useState } from 'react';
import { Alert, Space } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';
import { datetime } from 'utils';
import { DATE_FORMAT, RESPONSIVE_MEDIAS, ROUTERS } from 'components/contants';
import PlainText from 'components/Common/PlainText';
import ReactHtmlParser from 'react-html-parser';
import { useMediaQuery } from 'react-responsive';

export default function NotificationsBox({ items = [], redirectTo = () => {}, isExplain = true}) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [list, setList] = useState(items);
  const handleShowContent = id => {
    setList(list.map(item => item.id === id ? ({ ...item, showEnglish: !item.showEnglish }) : item));
  }
  return (
    <Space
      direction="vertical"
      style={{
        width: '100%',
        marginBottom: list.length ? (isMobile ? 8 : 20) : 0
      }}
    >
      {
        list.map((item) => (
          <Alert
            key={item.id}
            message={(
              <div className="display-flex display-flex--center-align-items display-flex--space-between-justify-content">
                <span>
                  <span style={{ marginRight: "10px"}}>{item.title}</span>
                  { !isExplain && <span className="link" onClick={() => redirectTo(ROUTERS.NOTIFICATIONS) }>View details</span>}
                </span>
                <span>{item.convertedUpdatedDate || datetime.convert(new Date(), DATE_FORMAT)}</span>
              </div>
            )}
            description={isExplain ? (
              <>
                <PlainText type="TextArea">{ ReactHtmlParser(!item.showEnglish ? item.contentVietnamese : item.contentEnglish) }</PlainText>
                <span className="link" onClick={() => handleShowContent(item.id) }>{ !item.showEnglish ? 'Show English content' : 'Show Vietnamese content' }</span>
              </>
            ) : ''}
            type="success"
            icon={<NotificationOutlined style={{ fontSize: 16 }} />}
            showIcon={true}
            closable
          />
        ))
      }
    </Space>
  )
}
