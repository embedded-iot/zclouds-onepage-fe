import React from 'react';
import DomainsTable from 'components/Seller/DomainsTable';
import PageHeader from 'components/Share/PageHeader';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';
import BoxCard from 'components/Share/BoxCard';

export default function DomainsSettingBox() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const BoxWrapper = isMobile ? 'div' : BoxCard;
  return (
    <BoxWrapper className={!isMobile && 'content-box__wrapper'} >
      <PageHeader
        title='Homepage'
        description={(
          <>
            Add default domain of all sales pages. Sellpages can use the domain example.xyz/page instead of page.example.xyz .<br />
            Note: Need to add page.example.xyz to sell page to use domain example.xyz/page
          </>
        )}
      />
      <DomainsTable />
    </BoxWrapper>
  )
}
