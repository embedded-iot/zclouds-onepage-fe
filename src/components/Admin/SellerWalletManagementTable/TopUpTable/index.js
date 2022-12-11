import React, { useEffect, useRef, useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import { Button, notification } from 'antd';
import Icon from 'components/Common/Icon';
import { AdminResellersService, BaseService } from 'services';
import plusBlack from 'images/plus-black-icon.svg';

import './style.scss';
import { cui, datetime } from 'utils';
import { DATE_FORMAT } from 'components/contants';
import InputText from 'components/Common/InputText';
import InputNumber from 'components/Common/InputNumber';
import plusIcon from 'images/plus_green_icon.svg';
import minusIcon from 'images/minus_green_icon.svg';
import AutoCompleteInput from 'components/Common/AutoCompleteInput';


export default function TopUpTable({ headerActionsConfig, onCancel, onOk, currentUser }) {
  const [resellerWallets, setResellerWallets] = useState([]);
  const [resellersOptions, setResellerSOptions] = useState([]);
  let ref = useRef({});

  const getResellersOptions = (params = {}) => {
    AdminResellersService.getResellers( cui.removeEmpty({ pageNum: 1, pageSize: 100, ...params }), response => {
      const newOptions = AdminResellersService.getResellersOptions(response.items, false);
      setResellerSOptions(newOptions);
    }, () => {})
  }

  const handleInputChange = (value, name, id) => {
    setResellerWallets(resellerWallets.map(item => item.id === id ? ({
      ...item,
      [name]: value,
    }) : item))
  }

  const handleAutoCompleteInputChange = (value, name, id) => {
    handleInputChange(value, name, id);

    if (ref.current.timeoutStoreChange) {
      clearTimeout(ref.current.timeoutStoreChange);
    }
    ref.current.timeoutStoreChange = setTimeout(() => {
      getResellersOptions({ keyword: value });
    }, 200);
  }

  const handleAutoCompleteInputSelect = (value, options, name, id) => {
    handleInputChange(value, name, id);
  }

  const handleAutoCompleteFocus = (value) => {
    getResellersOptions(!!value ? { keyword: value } : {});
  }

  const columns = [
    {
      title: 'Seller',
      dataIndex: 'resellerInput',
      render: (resellerInput, record) => {
        return (
          <AutoCompleteInput name="resellerInput"
                             value={resellerInput}
                             onFocus={() => handleAutoCompleteFocus(resellerInput)}
                             onChange={(value, name) => handleAutoCompleteInputChange(value, name, record.id)}
                             onSelect={(value, options, name) => handleAutoCompleteInputSelect(value, options, 'resellerId', record.id)}
                             placeholder={"All Resellers"}
                             options={resellersOptions}
                             autoFilterOptions={false}
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
          />
        )
      }
    },
  ];


  const tableConfig = {
    columns,
  };

  const onSelectedItemsChange = (keys) => {

  };

  const addNewResellerWallet = () => {
    ref.current.count = (ref.current.count || 0) + 1;
    setResellerWallets([
      ...resellerWallets,
      {
        id: ref.current.count,
        resellerId: '',
        resellerInput: '',
        amount: 0,
        createdBy: currentUser.username || 'username',
        convertedDate: datetime.convert(Date(), DATE_FORMAT),
        note: '',
      }
    ])
  }

  const handleOk = () => {
    AdminResellersService.topUpReseller(resellerWallets, response => {
      notification.success({
        message: "Top up successful!",
      });
      onOk();
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Top up failure!"),
      });
    })
  }

  const buttonList = [
    <Button onClick={onCancel}>Cancel</Button>,
    <Button type="primary" onClick={handleOk}>Top up now</Button>
  ]

  useEffect(() => {
    addNewResellerWallet();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <TableGrid configs={tableConfig}
                 defaultData={{
                   items: resellerWallets,
                 }}
                 headerActionsConfig={headerActionsConfig}
                 onSelectedItemsChange={onSelectedItemsChange}
                 isAllowSelection={true}
      />
      <Button type="link" className="top-up-table__add-button" icon={<Icon src={plusBlack} height={18} width={18} />} onClick={addNewResellerWallet}>Add new top up</Button>,
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
      />
    </>
  );
}
