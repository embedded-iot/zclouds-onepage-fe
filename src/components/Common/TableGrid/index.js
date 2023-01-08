import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import { events } from 'utils';
import TableView from 'components/Common/TableView';
import GridView from 'components/Common/GridView';
import DropdownSelect from 'components/Common/DropdownSelect';
import InputSearch from 'components/Common/InputSearch';
import PaginationBox from 'components/Common/PaginationBox';
import InputText from 'components/Common/InputText';

import './style.scss';
import DatePickerSelect from 'components/Common/DatePickerSelect';
import { filterListByPermission } from 'services/BaseService';


const defaultPageSizeOptions = [10, 20, 50, 100];

export default function TableGrid({
                                    type = 'table',
                                    className= '',
                                    configs = {},
                                    paginationConfig = {},
                                    headerActionsConfig = {
                                      buttonList: [],
                                      actionItems: [],
                                      allowRowLayout: false,
                                      gutter: [20, 20],
                                      onActionItemClick: () => {},
                                    },
                                    secondHeader = null,
                                    defaultParams = {},
                                    defaultData = {},
                                    isAllowUpdateDefaultData = false,
                                    isSingleSelection = false,
                                    onSelectedItemsChange = () => {},
                                    onSelectGridItem = () => {},
                                    isShowIndex = true,
                                    isShowPagination = false,
                                    isShowSelectedLabel = false,
                                    isAllowSelection = false,
                                    RELOAD_EVENT_KEY = '',
                                  }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageNumOptions, setPageNumOptions] = useState([]);
  const [filters, setFilters] = useState({});
  const [params, setParams] = useState({
    pageSize: 20,
    pageNum: 1,
    ...defaultParams
  });
  const [data, setData] = useState({
    items: [],
    totalCount: 0,
    ...defaultData
  });

  const pageSizeOptions = (paginationConfig.pageSizeOptions
    || defaultPageSizeOptions).map(pageSize => ({
    label: `${pageSize} per page`,
    value: pageSize.toString(),
  }))

  const getDataFunc = useCallback((newParams = {}) => {
    if (!configs.getDataFunc) return;
    configs.getDataFunc(newParams, (response) => {
      setData(response);
      configs.successCallback(response);
    }, error => {
      configs.failureCallback(error);
    })
    // eslint-disable-next-line
  }, []);

  const reloadListenerFunc = () => {
    let reloadListener = null;
    if (!!RELOAD_EVENT_KEY) {
      reloadListener = events.subscribe(RELOAD_EVENT_KEY, (payload = {}) => {
        setSelectedRowKeys([]);
        const newParams = { ...params, ...payload };
        setParams(newParams);
        getDataFunc(newParams);
      })
    }
    return reloadListener;
  }

  useEffect(() => {
    if (!isAllowUpdateDefaultData)
      return;
    setData({
      ...data,
      ...defaultData,
    });
    // eslint-disable-next-line
  }, [defaultData])

  useEffect(() => {
    getDataFunc(params);
    const reloadListener = reloadListenerFunc();

    return () => {
      reloadListener && reloadListener.remove();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const calculatorTotalPage = Math.floor(data.totalCount/params.pageSize) + (data.totalCount % params.pageSize ? 1 : 0 );
    const totalPage = data.totalPage || calculatorTotalPage || 0;
    const pageNumOptionList = [...Array(totalPage)].map((item, index) => ({
      label: `Page ${index + 1}`,
      value: (index + 1).toString(),
    }));
    setPageNumOptions(pageNumOptionList);
  }, [params, data]);

  const onSelectChange = (newSelectedRowKey = []) => {
    const selectedKeys = isSingleSelection ? ( newSelectedRowKey.length ? [newSelectedRowKey[newSelectedRowKey.length - 1]]: []) : newSelectedRowKey;
    setSelectedRowKeys(selectedKeys);
    onSelectedItemsChange(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const onPaginationChange = (page, pageSize) => {
    const newParams = { ...params, pageNum: page };
    setParams(newParams);
    getDataFunc(newParams);
  };

  const onDropdownChange = (value, name) => {
    const newParams = { ...params, [name]: +value };
    setParams(newParams);
    getDataFunc(newParams);
  };

  const onInputChange = (value, name) => {
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
  };

  const onDateChange = (date, dateString, name) => {
    if (!!date) {
      const newFilters = {
        ...filters,
        [name[0]]: dateString[0],
        [name[1]]: dateString[1],
      };
      setFilters(newFilters);
    } else {
      const newFilters = {
        ...filters,
        fromDate: '',
        toDate: '',
      };
      setFilters(newFilters);
    }
  };

  const handleSearch = () => {
    const newParams = { ...params, ...filters };
    setParams(newParams);
    getDataFunc(newParams);
  };

  const getFilterActionComponent = (item, index, hasCol = false) => {
    const ACTION_TYPES = {
      'searchText': (
        <InputSearch
          name={configs.searchTextKey || (item.props && item.props.name) || "keyword"}
          placeholder={configs.searchPlaceholder || (item.props && item.props.name)}
          onChange={onInputChange}
          {...item.props}
        />
      ),
      'inputText': (
        <InputText
          name={(item.props && item.props.name) || "inputText"}
          placeholder={item.props && item.props.placeholder}
          onChange={onInputChange}
          style={{ width: !hasCol && 'auto'}}
          {...item.props}
        />
      ),
      'datePicker': (
        <DatePickerSelect
          name={(item.props && item.props.name) || ['fromDate', 'toDate']}
          onChange={onDateChange}
          style={{ width: !hasCol && 'auto'}}
          {...item.props}
        />
      ),
      'pageNum': (
        <DropdownSelect
          name="pageNum"
          options={pageNumOptions}
          defaultValue={params.pageNum.toString()}
          onChange={onDropdownChange}
          style={{ width: !hasCol && 'auto'}}
          {...item.props}
        />
      ),
      'pageSize': (
        <DropdownSelect
          name="pageSize"
          options={pageSizeOptions}
          defaultValue={params.pageSize.toString()}
          onChange={onDropdownChange}
          style={{ width: !hasCol && 'auto'}}
          {...item.props}
        />
      ),
      'searchButton': (
        <Button type='primary'
                onClick={handleSearch}
                style={{ width: !hasCol && 'auto'}}
                {...item.props}
        >
          Find
        </Button>
      ),
    }
    if (hasCol) {
      return <Col span={item.span}>{ACTION_TYPES[item.type] || item.render}</Col>
    }
    return ACTION_TYPES[item.type] || item.render;
  }

  const filteredHeaderActions = headerActionsConfig.buttonList ? headerActionsConfig.buttonList.filter(item => {
    return (item.permission === undefined || item.permission === true) && (item.requiredSelection === undefined
      || (item.requiredSelection === true && selectedRowKeys.length)
      || (item.requiredSelection === false && selectedRowKeys.length === 0))
  }) : [];

  const leftFilteredHeaderActions = filterListByPermission(filteredHeaderActions).filter(item => item.align !== 'right');
  const rightFilteredHeaderActions = filterListByPermission(filteredHeaderActions).filter(item => item.align === 'right');

  const columns = isShowIndex ? [{ title: '#', dataIndex: 'index', }, ...(configs.columns || []) ] : (configs.columns || []);
  const items = data.items.map((item, index) => isShowIndex ? ({ index: index + 1, ...item }) : item);
  return (
    <div className={`table-view-wrapper ${className}`}>
      {
        !!filteredHeaderActions.length && (
          <div className={`table-header ${headerActionsConfig.className}`}>
            {
              !headerActionsConfig.allowRowLayout && !!leftFilteredHeaderActions.length && (
                <div className="table-header__left-block">
                  {
                    leftFilteredHeaderActions.map((item, index) => getFilterActionComponent(item, index, false))
                  }
                </div>
              )
            }
            {
              !headerActionsConfig.allowRowLayout && !!rightFilteredHeaderActions.length && (
                <div className="table-header__right-block">
                  {
                    rightFilteredHeaderActions.map((item, index) => getFilterActionComponent(item, index, false))
                  }
                </div>
              )
            }
            {
              headerActionsConfig.allowRowLayout && !!filteredHeaderActions.length && (
                <Row className="table-header__row-block" gutter={headerActionsConfig.gutter}>
                  {
                    filteredHeaderActions.map((item, index) => getFilterActionComponent(item, index, true))
                  }
                </Row>
              )
            }
          </div>
        )
      }
      { !!secondHeader && <div className="table-second-header">{secondHeader}</div>}
      { !!isShowSelectedLabel && <div className="selected-item-label">{ hasSelected && `Selected ${selectedRowKeys.length} items.`} </div>}
      {
        type === 'table' && (
          <TableView
            rowSelection={isAllowSelection ? rowSelection : null}
            columns={columns}
            dataSource={items}
            pagination={false}
            rowKey={record => record.id}
            onRow={configs.onRow}
          />
        )
      }
      {
        type === 'grid' && (
          <GridView
            gutter={configs.gutter}
            colSpan={configs.colSpan}
            isAllowSelection={isAllowSelection}
            dataSource={items}
            gridItemTemplate={configs.gridItemTemplate}
            onSelectGridItem={onSelectGridItem}
          />
        )
      }
      {
        type === 'custom' && !!configs.customBodyTemplate && configs.customBodyTemplate({ params, dataSource: items })
      }
      { isShowPagination && <br/>}
      {
        isShowPagination && !!data.totalCount && (
          <div className="pagination-box">
            <PaginationBox
              {...paginationConfig}
              total={data.totalCount}
              pageSize={params.pageSize}
              current={params.pageNum}
              onChange={onPaginationChange}
              showSizeChanger={false}
            />
          </div>
        )
      }
    </div>
  );
}
