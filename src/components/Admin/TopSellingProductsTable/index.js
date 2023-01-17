import React, { useEffect, useRef, useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminDashboardService, AdminResellersService } from 'services';
import { cui, events } from 'utils';
import bagIcon from 'images/bag_blue_icon.svg';
import Icon from 'components/Common/Icon';
import DropdownSelect from 'components/Common/DropdownSelect';
import { PERIOD_STATE_LABEL_VALUE_OPTIONS } from 'components/contants';
import TopSellingProductsBox from './TopSellingProductsBox';
import { Empty } from 'antd';
import AutoCompleteInput from 'components/Common/AutoCompleteInput';
import './style.scss';

const renderOrdersOverviewBody = ({ dataSource = [] }) => {
  return (
    dataSource.length ? <TopSellingProductsBox products={dataSource} /> : <Empty />
  )
}

export default function TopSellingProductsTable({ RELOAD_EVENT_KEY = 'RELOAD_TOP_SELLING_PRODUCTS_TABLE_EVENT_KEY' }) {
  const [filters, setFilters] = useState({});
  const [resellersInput, setResellersInput] = useState({
    value: '',
    options: [],
  });
  let ref = useRef({});
  const tableConfig = {
    customBodyTemplate: renderOrdersOverviewBody,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      AdminDashboardService.getTopSellingProducts(cui.removeEmpty({ ...restParams }), successCallback, failureCallback)
    },
    successCallback: (response) => {
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  // eslint-disable-next-line
  const reloadTable = (filters ={}) => {
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const handleFilterChange = (value, name) => {
    const newFilters = {
      ...filters,
      ...(typeof value === 'object' ? value : { [name]: value })
    }
    setFilters(newFilters);
    reloadTable(newFilters);
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

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: (
          <AutoCompleteInput name="sellerId"
                             value={resellersInput.value}
                             onChange={handleAutoCompleteInputChange}
                             onSelect={handleAutoCompleteInputSelect}
                             placeholder={"All sellers"}
                             options={resellersInput.options}
                             autoFilterOptions={false}
                             style={{width: 300}}
          />
        )
      },
      {
        type: 'custom',
        render: (
          <DropdownSelect
            name="period"
            options={PERIOD_STATE_LABEL_VALUE_OPTIONS}
            defaultValue={1}
            onChange={handleFilterChange}
            style={{width: 300}}
          />
        ),
      },
      {
        type: 'searchText',
        props: {
          placeholder: "Search by product name..."
        }
      },
      {
        type: 'searchButton',
      },
    ],
  }

  useEffect(() => {
    getResellersOptions( {});
  }, []);


  return (
    <>
      <div className='display-flex display-flex--center-align-items'>
        <Icon src={bagIcon}/>
        <span className="dashboard-box__title">Top Selling Products</span>
      </div>
      <TableGrid configs={tableConfig}
                 type="custom"
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={false}
                 isAllowSelection={false}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
                 className="dashboard-box__table"
      />
    </>
  );
}
