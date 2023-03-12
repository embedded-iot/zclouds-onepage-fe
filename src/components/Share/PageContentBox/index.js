import React from 'react';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import './style.scss';
import Icon from 'components/Common/Icon';
import backIcon from 'images/arrow_left_icon_1.svg';
import BoxHeader from 'components/Share/BoxHeader';
import { useMediaQuery } from 'react-responsive';
import BoxCard from 'components/Share/BoxCard';

export default function PageContentBox({ goBack = () => {}, title, children}) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const BoxWrapper = isMobile ? 'div' : BoxCard;
  return (
    <BoxWrapper className={`page-content-box__wrapper ${!isMobile && 'content-box__wrapper'}`} >
      <div className='page-content-box__back'>
        <Icon src={backIcon} className="cursor-pointer" onClick={() => goBack()} />
        <span className="page-content-box__back-title">Back</span>
      </div>
      <br/>
      {
        !!title && (
          <BoxHeader
            title={title}
            align='left'
          />
        )
      }
      {
        children
      }
    </BoxWrapper>
  )
}
