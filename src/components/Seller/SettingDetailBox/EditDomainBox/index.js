import React from 'react';
import EditDomainTemplateBox from 'components/Seller/DomainsTable/EditDomainTemplateBox';
import PageContentBox from 'components/Share/PageContentBox';

import './style.scss';

export default function EditDomainBox({ goBack, settingKey, subSettingKey }) {
  return (
    <PageContentBox
      title={`Edit ${subSettingKey}`}
      goBack={goBack}
    >
      <EditDomainTemplateBox
        data={subSettingKey}
        goBack={goBack}
      />
    </PageContentBox>
  )
}
