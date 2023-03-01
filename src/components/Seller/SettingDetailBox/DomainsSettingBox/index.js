import React from 'react';
import DomainsTable from 'components/Seller/DomainsTable';
import PageHeader from 'components/Share/PageHeader';

export default function DomainsSettingBox() {
  return (
    <>
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
    </>
  )
}
