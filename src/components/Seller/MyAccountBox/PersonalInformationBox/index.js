import React from 'react';
import BoxCard from 'components/Share/BoxCard';
import PersonalInformationForm from './PersonalInformationForm';

export default function PersonalInformationBox({ currentUser }) {
  return (
    <BoxCard className="my-account__box">
      <PersonalInformationForm onFinish={() => {}}
                               initialValues={currentUser}
      />
    </BoxCard>
  )
}
