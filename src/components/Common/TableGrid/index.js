import React, { useCallback, useEffect, useState } from 'react';
import { Button, Pagination, Table } from 'antd';
import Grid from 'components/Common/Grid';
import { events } from 'utils';
import DropdownSelect from 'components/Common/DropdownSelect';
import InputSearch from 'components/Common/InputSearch';

import './style.scss';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';


const defaultPageSizeOptions = [10, 20, 50, 100];

export default function TableGrid({
                                    type = 'table',
                                    configs = {},
                                    paginationConfig = {},
                                    buttonListWrapperConfig = {
                                      buttonList: [],
                                      actionItems: [],
                                      onActionItemClick: () => {},
                                    },
                                    defaultParams = {},
                                    defaultData = {},
                                    onSelectedItemsChange = () => {},
                                    onSelectGridItem = () => {},
                                    isShowSearch = false,
                                    isShowPageSize = false,
                                    isShowPageNum = false,
                                    isShowPagination = false,
                                    isAllowSelection = false,
                                    RELOAD_EVENT_KEY = ''
                                  }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [pageNumOptions, setPageNumOptions] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [params, setParams] = useState({
    pageSize: 20,
    pageNum: 0,
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

  useEffect(() => {
    getDataFunc(params);
    let reloadListener = null;
    if (!!RELOAD_EVENT_KEY) {
      reloadListener = events.subscribe(RELOAD_EVENT_KEY, (payload = {}) => {
        const newParams = { ...params, ...payload };
        setParams(newParams);
        getDataFunc(newParams);
      })
    }
    return () => {
      reloadListener && reloadListener.remove();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const pageNumOptionList = [...Array(Math.round((data.totalCount || 0)/params.pageSize))].map((item, index) => ({
      label: `Page ${index + 1}`,
      value: index.toString(),
    }));
    setPageNumOptions(pageNumOptionList);
  }, [params, data]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    onSelectedItemsChange(newSelectedRowKeys);
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

  const onSearchChange = (value, name) => {
    setSearchText(value);
  };

  const handleSearch = () => {
    const newParams = { ...params, [configs.searchTextKey || "searchText"]: searchText };
    setParams(newParams);
    getDataFunc(newParams);
  };

  return (
    <div className="table-view-wrapper">
      <div className="table-header">
        {
          (!!(buttonListWrapperConfig.buttonList || []).length || !!(buttonListWrapperConfig.actionItems || []).length) && (
            <ButtonListWrapper {...buttonListWrapperConfig} />
          )
        }
      </div>
      {
        (isShowSearch || isShowPageSize || isShowPageNum) && (
          <div className="">
            {
              isShowSearch && (
                <InputSearch
                  name={configs.searchTextKey || "searchText"}
                  placeholder={configs.searchPlaceholder}
                  onChange={onSearchChange}
                />
              )
            }
            {
              isShowPageNum && (
                <DropdownSelect
                  name="pageNum"
                  options={pageNumOptions}
                  defaultValue={params.pageNum.toString()}
                  onChange={onDropdownChange}
                />
              )
            }
            {
              isShowPageSize && (
                <DropdownSelect
                  name="pageSize"
                  options={pageSizeOptions}
                  defaultValue={params.pageSize.toString()}
                  onChange={onDropdownChange}
                />
              )
            }
            {
              isShowSearch && (<Button type='primary' onClick={handleSearch}>Find</Button>)
            }
          </div>
        )
      }
      { hasSelected && <div className="selected-item-label">{`Selected ${selectedRowKeys.length} items.`}</div>}
      {
        type === 'table' && (
          <Table rowSelection={isAllowSelection ? rowSelection : null}
                 columns={configs.columns}
                 dataSource={data.items}
                 pagination={false}
          />
        )
      }
      {
        type !== 'table' && (
          <Grid gutter={configs.gutter}
                colSpan={configs.colSpan}
                isAllowSelection={isAllowSelection}
                dataSource={data.items}
                gridItemTemplate={configs.gridItemTemplate}
                onSelectGridItem={onSelectGridItem}
          />
        )
      }
      <br/>
      {
        isShowPagination && !!data.totalCount && (
          <Pagination
            {...paginationConfig}
            total={data.totalCount}
            pageSize={params.pageSize}
            current={params.pageNum}
            onChange={onPaginationChange}
            showSizeChanger={false}
          />
        )
      }
    </div>
  );
}
