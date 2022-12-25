import React, { useEffect, useRef, useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import { Button, notification } from 'antd';
import Icon from 'components/Common/Icon';
import { AdminResellersService, AdminWalletsService, BaseService } from 'services';
import plusBlack from 'images/plus-black-icon.svg';

import './style.scss';
import { cui, datetime } from 'utils';
import { DATE_FORMAT, TRANSACTION_TYPE_LABEL_VALUE_OPTIONS, TRANSACTION_TYPE_VALUES } from 'components/contants';
import InputText from 'components/Common/InputText';
import InputNumber from 'components/Common/InputNumber';
import plusIcon from 'images/plus_green_icon.svg';
import minusIcon from 'images/minus_green_icon.svg';
import removeIcon from 'images/remove_round_gray_icon.svg';
import AutoCompleteInput from 'components/Common/AutoCompleteInput';
import DropdownSelect from 'components/Common/DropdownSelect';

export default function TopUpTable({ onCancel, onOk, className, currentUser }) {
  const [resellerWallets, setResellerWallets] = useState([]);
  const [resellersOptions, setResellerSOptions] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  let ref = useRef({});
  const [, ...transactionTypesOptions] = TRANSACTION_TYPE_LABEL_VALUE_OPTIONS;
  const getResellersOptions = (params = {}) => {
    AdminResellersService.getResellers( cui.removeEmpty({ pageNum: 1, pageSize: 100, ...params }), response => {
      const newOptions = AdminResellersService.getResellersOptions(response.items, false);
      setResellerSOptions(newOptions);
    }, () => {})
  }

  const handleInputChange = (value, name, id) => {
    setResellerWallets(prevResellerWallets => prevResellerWallets.map(item => item.id === id ? ({
      ...item,
      [name]: value,
    }) : item))
  }
  const handleRemove = (id) => {
    setResellerWallets(resellerWallets.filter(item => item.id !== id));
  }

  const handleAutoCompleteInputChange = (value, name, id) => {
    if (typeof value !== 'string') {
      return;
    }
    handleInputChange(value, name, id);

    if (ref.current.timeoutStoreChange) {
      clearTimeout(ref.current.timeoutStoreChange);
    }
    ref.current.timeoutStoreChange = setTimeout(() => {
      getResellersOptions({ keyword: value });
    }, 300);
  }

  const handleAutoCompleteInputSelect = (value, option, name, id) => {
    handleInputChange(value, name, id);
  }

  const handleAutoCompleteFocus = (value) => {
    getResellersOptions(!!value ? { keyword: value } : {});
  }

  const columns = [
    {
      title: 'Type',
      dataIndex: 'type',
      render: (type, record) => {
        return (
          <DropdownSelect
            name="type"
            options={transactionTypesOptions}
            value={type}
            onChange={(value, name) => handleInputChange(value, name, record.id)}
            style={{minWidth: 130}}
            theme="light"
          />
        )
      }
    },
    {
      title: 'Seller',
      dataIndex: 'resellerInput',
      render: (resellerInput, record) => {
        return (
          <AutoCompleteInput name="resellerInput"
                             value={resellerInput}
                             onFocus={() => handleAutoCompleteFocus(resellerInput)}
                             onChange={(value, name) => handleAutoCompleteInputChange(value, name, record.id)}
                             onSelect={(value, options, name) => handleAutoCompleteInputSelect(value, options,'resellerId', record.id)}
                             placeholder={"All Resellers"}
                             options={resellersOptions}
                             autoFilterOptions={false}
                             theme="light"
                             style={{minWidth: 100}}
          />
        )
      }
    },
    {
      title: 'Money ($)',
      dataIndex: 'amount',
      render: (amount, record) => {
        return (
          <div className="top-up-table__mount-cell">
            <Icon className="cursor-pointer" src={plusIcon} height={16} width={16} onClick={() => handleInputChange(amount + 1, 'amount', record.id)}/>
            <InputNumber
              value={amount}
              name="amount"
              placeholder="Money ($)"
              theme="light"
              onChange={(value, name) => handleInputChange(value, name, record.id)}
            />
            <Icon className="cursor-pointer" src={minusIcon} height={16} width={16} onClick={() => handleInputChange((amount - 1) >= 0 ? (amount - 1) : 0  , 'amount', record.id)}/>
          </div>
        )
      }
    },
    {
      title: 'Created by',
      dataIndex: 'createdBy',
    },
    {
      title: 'Date',
      dataIndex: 'convertedDate',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      render: (note, record) => {
        return (
          <InputText value={note}
                     name="note"
                     placeholder="Note"
                     onChange={(value, name) => handleInputChange(value, name, record.id)}
                     theme="light"
          />
        )
      }
    },
    {
      title: '',
      dataIndex: 'id',
      render: (id) => {
        return (<Icon src={removeIcon} height={18} width={18} className="cursor-pointer" onClick={() => handleRemove(id)}/>)
      }
    },
  ];


  const tableConfig = {
    columns,
  };

  const onSelectedItemsChange = (keys) => {
    setSelectedKeys(keys);
  };

  const addNewResellerWallet = () => {
    ref.current.count = (ref.current.count || 0) + 1;
    setResellerWallets([
      ...resellerWallets,
      {
        id: ref.current.count,
        type: TRANSACTION_TYPE_VALUES.TOP_UP,
        resellerId: 0,
        resellerInput: '',
        amount: 0,
        createdBy: currentUser.username || 'username',
        convertedDate: datetime.convert(new Date(), DATE_FORMAT),
        note: '',
      }
    ])
  }

  const handleOk = () => {
    const selectedTransactions = resellerWallets.filter(item => selectedKeys.includes(item.id));
    if (!selectedTransactions.length) {
      notification.error({
        message: "Please select transactions before submit!",
      });
      return;
    }
    const validTransactions = selectedTransactions.filter(item => !!item.resellerId).map(item => ({
      sellerId: item.resellerId,
      amount: (item.type === TRANSACTION_TYPE_VALUES.WITHDRAW ? -1 : 1) * item.amount,
      note: item.note,
    }));
    if (selectedTransactions.length !== validTransactions.length) {
      notification.error({
        message: "Reseller can't empty in selected transactions. Please check again!",
      });
      return;
    }
    AdminWalletsService.topUpWithdrawWallet(validTransactions, response => {
      notification.success({
        message: "Top up / withdraw successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Top up / withdraw failure!"),
      });
    })
  }

  const buttonList = [
    <Button onClick={onCancel}>Cancel</Button>,
    <Button type="primary" onClick={handleOk}>Top up / withdraw now</Button>
  ]

  useEffect(() => {
    addNewResellerWallet();
    // eslint-disable-next-line
  }, []);
  return (
    <div className={className}>
      <TableGrid configs={tableConfig}
                 defaultData={{
                   items: resellerWallets,
                 }}
                 isAllowUpdateDefaultData={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 isAllowSelection={true}
      />
      <div className='top-up-table__add-box'>
        <Button type="link" className="top-up-table__add-button" icon={<Icon src={plusBlack} height={18} width={18} />} onClick={addNewResellerWallet}>Add new top up (withdraw)</Button>
      </div>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
      />
    </div>
  );
}
