import React, { useEffect, useRef, useState } from 'react';
import ModalView, { MODAL_TYPES } from 'components/Common/ModalView';
import { Form, notification } from 'antd';
import { AdminResellersService, AdminTransactionsService, BaseService } from 'services';
import ConfirmTransactionForm from './ConfirmTransactionForm';
import { cui } from 'utils';

export default function ConfirmTransactionModal({ open, data, onOk, onCancel }) {
  const [form] = Form.useForm();
  const [filters, setFilters] = useState({});
  let ref = useRef({});
  const [resellersInput, setResellersInput] = useState({
    value: '',
    options: [],
  });
  const handleOk = (values) => {
    AdminTransactionsService.confirmTransaction(data.id, values, response => {
      notification.success({
        message: "Confirm transaction successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error,"Confirm transaction failure!"),
      });
    })
  }


  const getResellersOptions = (params = {}) => {
    AdminResellersService.getResellers( cui.removeEmpty({ pageNum: 1, pageSize: 100, ...params }), response => {
      const newOptions = AdminResellersService.getResellersOptions(response.items, false);
      setResellersInput((prevState) => {
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
    setResellersInput({
      ...resellersInput,
      value: value,
    });

    if (ref.current.timeoutStoreChange) {
      clearTimeout(ref.current.timeoutStoreChange);
    }
    ref.current.timeoutStoreChange = setTimeout(() => {
      getResellersOptions({ keyword: value });
    }, 200);
  }

  const handleAutoCompleteInputSelect = (value, options, name) => {
    handleFilterChange(value, name);
  }

  useEffect(() => {
    getResellersOptions( {});
    // eslint-disable-next-line
  }, []);

  return (
    <ModalView type={MODAL_TYPES.CONFIRM_MODAL}
               form={form}
               open={open}
               title={"Confirm transaction"}
               okText={"Save"}
               onOk={handleOk}
               onCancel={onCancel}
    >
      <ConfirmTransactionForm
        form={form}
        initialValues={data}
        resellersInput={resellersInput}
        omAutoCompleteInputChange={handleAutoCompleteInputChange}
        onAutoCompleteInputChange={handleAutoCompleteInputChange}
        onAutoCompleteInputSelect={handleAutoCompleteInputSelect}
      />
    </ModalView>
  )
}
