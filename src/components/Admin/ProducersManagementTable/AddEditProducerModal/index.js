import React from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import ProducerForm from './ProducerForm';
import { AdminProducersService, BaseService } from 'services';

export default function AddEditProducerModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const isEdit = !!data;
  const handleOk = (values) => {
    const { producerName, producerEmail, producerNumber, producerAddress, producerWebsite, messagingApp1, producerMessagingName1, messagingApp2, producerMessagingName2, producerIdCard, status} = values;
    const producerData = {
      producerName, producerEmail, producerNumber, producerAddress, producerWebsite, producerIdCard, status,
      messagingInfoList: [{
        messagingApp: messagingApp1,
        producerMessagingName: producerMessagingName1,
      }, {
        messagingApp: messagingApp2,
        producerMessagingName: producerMessagingName2,
      }],
    }
    if (isEdit) {
      AdminProducersService.updateProducer(data.id, producerData, response => {
        notification.success({
          message: "Update producer successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error,"Update producer failure!" ),
        });
      })
    } else {
      AdminProducersService.createProducer(producerData, response => {
        notification.success({
          message: "Create producer successful!",
        });
        onOk();
      }, error => {
        notification.error({
          message: BaseService.getErrorMessage(error, "Create producer failure!"),
        });
      })
    }

  }
  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={isEdit ? "Edit producer" : "Add producer"}
               okText={isEdit ? "Save" : "Add"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <ProducerForm
        form={form}
        initialValues={data}
      />
    </ModalView>
  )
}
