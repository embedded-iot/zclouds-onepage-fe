import React, { useEffect, useState } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import VerifyTopUpForm from './VerifyTopUpForm';
import Icon from 'components/Common/Icon';
import paperIcon from 'images/paper_black_icon.svg'
import { BaseService, SellerBanksService, SellerWalletService } from 'services';

export default function VerifyTopUpModal({ open, onOk, onCancel }) {
  const [form] = Form.useForm();
  const [walletMethodsOptions, setWalletMethodsOptions] = useState([]);

  const handleOk = values => {
    SellerWalletService.verifyTopUp(values, response => {
      notification.success({
        message: "Verify top up successful!",
      });
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Verify top up failure!" ),
      });
    })
  }

  useEffect(() => {
    SellerBanksService.getBanksInfo(response => {
      setWalletMethodsOptions(SellerWalletService.getWalletMethodsOptions(SellerBanksService.getGroupedBanks(response || [])));
    })
  }, []);

  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={<><Icon src={paperIcon} width={24} height={24} /><span>Verify top up</span></>}
               okText={"Verify"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <VerifyTopUpForm form={form}
                       walletMethodsOptions={walletMethodsOptions}
      />
    </ModalView>
  )
}
