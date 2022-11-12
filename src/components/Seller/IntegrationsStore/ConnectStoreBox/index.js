import React from 'react';
import { Card } from 'antd';

export default function ConnectStoreBox({ title, description, videoSrc, children }) {
  return (
    <Card title={title || "Requirements"} className="connect-store__wrapper">
      <div className='connect-store__description'>
        {
          description
        }
      </div>
      <iframe width="100%" height="315" src="https://www.youtube.com/embed/XO-n9U-UwSk" title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
      <div className='connect-store__sub-title'>
        Connect your store now!
      </div>
      <div className='connect-store__form-contents'>

      </div>
    </Card>
  )
}
