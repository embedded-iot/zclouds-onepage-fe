import React from 'react';
import BoxCard from 'components/Share/BoxCard';
import ChangePasswordForm from './ChangePasswordForm';

export default function ChangePasswordBox() {
  return (
    <BoxCard className="my-account__box">
      <ChangePasswordForm onFinish={() => {}}
      />
    </BoxCard>
  )
}
