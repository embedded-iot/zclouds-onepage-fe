import React, { useEffect, useRef, useState } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import { AdminProducersService, BaseService, AdminOrdersService } from 'services';
import OrderProducerForm from './OrderProducerForm';
import { cui } from 'utils';

export default function UpdateOrderProducerModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({
    producerId: data.producerId,
  });
  let ref = useRef({});
  const [producersInput, setProducersInput] = useState({
    value: "",
    options: [],
  });
  const handleOk = (values) => {
    const { producerId } = filters;
    const orderProducerData = {
      producerId,
    }
    AdminOrdersService.updateOrderProducer(data.id, orderProducerData, response => {
      notification.success({
        message: "Update order producer successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Update order producer failure!"),
      });
    })
  }


  const getProducersOptions = (params = {}) => {
    AdminProducersService.getProducers( cui.removeEmpty({ pageNum: 1, pageSize: 100, ...params }), response => {
      const newOptions = AdminProducersService.getProducersOptions(response.items, false);
      setProducersInput((prevState) => {
        return {
          ...prevState,
          options: newOptions,
        }
      });
    }, () => {})
  }


  const handleFilterChange = (value, name) => {
    const newFilters = {
      ...filters,
      ...(typeof value === 'object' ? value : { [name]: value })
    }
    setFilters(newFilters);
  }

  const handleAutoCompleteInputChange = (value, name) => {
    setProducersInput({
      ...producersInput,
      value: value,
    });

    if (ref.current.timeoutStoreChange) {
      clearTimeout(ref.current.timeoutStoreChange);
    }
    ref.current.timeoutStoreChange = setTimeout(() => {
      getProducersOptions({ keyword: value });
    }, 200);
  }

  const handleAutoCompleteInputSelect = (value, options, name) => {
    handleFilterChange(value, name);
  }

  useEffect(() => {
    getProducersOptions( {});
    // eslint-disable-next-line
  }, []);

  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={"Update order producer"}
               okText={"Save"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <OrderProducerForm
        form={form}
        initialValues={data.producer}
        producersInput={producersInput}
        onAutoCompleteInputChange={handleAutoCompleteInputChange}
        onAutoCompleteInputSelect={handleAutoCompleteInputSelect}
      />
    </ModalView>
  )
}
