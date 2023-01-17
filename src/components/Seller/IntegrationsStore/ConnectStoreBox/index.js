import React from 'react';
import { Card } from 'antd';
import './style.scss';
import Icon from 'components/Common/Icon';
import infoIcon from 'images/info-light-icon.svg';


export default function ConnectStoreBox({ title, description, videoSrc, children }) {
  return (
    <Card title={<><Icon src={infoIcon} width={24} height={24} /> Requirements</>}
          className="connect-store__wrapper"
          bordered={false}
    >
      <div className='connect-store__description'>
        {
          description
        }
      </div>
      <iframe width="100%" height="242" src="https://www.youtube.com/embed/XO-n9U-UwSk" title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
      <div className='connect-store__sub-title'>
        Connect your store now!
      </div>
      <div className='connect-store__form-contents'>
        {
          children
        }
      </div>
    </Card>
  )
}
