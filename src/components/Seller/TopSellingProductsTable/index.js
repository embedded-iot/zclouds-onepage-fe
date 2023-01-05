import React, { useEffect, useRef, useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { SellerStatisticsService, SellerStoresService } from 'services';
import { cui, events } from 'utils';
import bagIcon from 'images/bag_blue_icon.svg';
import Icon from 'components/Common/Icon';
import AutoCompleteInput from 'components/Common/AutoCompleteInput';
import DropdownSelect from 'components/Common/DropdownSelect';
import { PERIOD_STATE_LABEL_VALUE_OPTIONS } from 'components/contants';
import TopSellingProductsBox from 'components/Seller/TopSellingProductsTable/TopSellingProductsBox';

const renderOrdersOverviewBody = ({ dataSource = [] }) => {
  return (
    <TopSellingProductsBox products={dataSource} />
  )
}

export default function TopSellingProductsTable({ RELOAD_EVENT_KEY = 'RELOAD_TOP_SELLING_PRODUCTS_TABLE_EVENT_KEY' }) {
  const [filters, setFilters] = useState({});
  const [storesInput, setStoresInput] = useState({
    value: '',
    options: [],
  });
  let ref = useRef({});
  const tableConfig = {
    customBodyTemplate: renderOrdersOverviewBody,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, type, ...restParams} = params || {};
      SellerStatisticsService.getTopsellingProducts(cui.removeEmpty({ ...restParams, pageSize, pageNum }), successCallback, failureCallback)
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


  const getStoresOptions = (params = {}) => {
    SellerStoresService.getStores( cui.removeEmpty({ pageNum: 1, pageSize: 100, ...params }), response => {
      const newOptions = SellerStoresService.getStoresOptions(response.items, false);
      setStoresInput((prevStoresInput) => {
        return {
          ...prevStoresInput,
          options: newOptions,
        }
      });
    }, () => {})
  }

  const handleStoreInputChange = (value, name) => {
    setStoresInput({
      ...storesInput,
      value: value,
    });
    if (ref.current.timeoutStoreChange) {
      clearTimeout(ref.current.timeoutStoreChange);
    }
    ref.current.timeoutStoreChange = setTimeout(() => {
      getStoresOptions({ keyword: value });
    }, 200);
  }

  const handleStoreInputSelect = (value, options, name) => {
    handleFilterChange(value, name);
  }


  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: (
          <AutoCompleteInput name="storeId"
                             value={storesInput.value}
                             onChange={handleStoreInputChange}
                             onSelect={handleStoreInputSelect}
                             placeholder={"All Stores"}
                             options={storesInput.options}
                             autoFilterOptions={false}
                             theme='light'
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
            defaultValue={''}
            onChange={handleFilterChange}
            theme='light'
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
    getStoresOptions( {});
    // eslint-disable-next-line
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
