import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import BoxCard from 'components/Share/BoxCard';
import BoxHeader from 'components/Share/BoxHeader';
import Icon from 'components/Common/Icon';
import backIcon from 'images/arrow_left_icon_1.svg';
import EditDomainTemplateBox from 'components/Seller/DomainsTable/EditDomainTemplateBox';

import './style.scss';

export default function EditDomainBox({ goBack, settingKey, subSettingKey }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const BoxWrapper = isMobile ? 'div' : BoxCard;
  return (
    <BoxWrapper className={`edit-domain-box__wrapper ${!isMobile && 'content-box__wrapper'}`} >
      <div className='setting-sibar-box__back'>
        <Icon src={backIcon} className="cursor-pointer" onClick={() => goBack()} />
        <span className="setting-sibar-box__back-title">Back</span>
      </div>
      <br/>
      <BoxHeader
        title={`Edit ${subSettingKey}`}
        align='left'
      />
      <EditDomainTemplateBox
        data={subSettingKey}
        goBack={goBack}
      />
    </BoxWrapper>
  )
}
