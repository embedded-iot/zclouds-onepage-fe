import React, { useCallback, useEffect, useState } from 'react';
import { Pagination, Table } from 'antd';

import './style.scss';
import { events } from 'utils';

export default function TableGrid({
                                    tableConfig = {},
                                    paginationConfig = {},
                                    actionButtonList = [],
                                    defaultParams = {},
                                    defaultData = {},
                                    onSelectedItemsChange = () => {},
                                    isShowPagination = false,
                                    isAllowSelection = false,
                                    RELOAD_EVENT_KEY = ''
                                  }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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
  const getDataFunc = useCallback((newParams = {}) => {
    if (!tableConfig.getDataFunc) return;
    tableConfig.getDataFunc(newParams, (response) => {
      setData(response);
      tableConfig.successCallback(response);
    }, error => {
      tableConfig.failureCallback(error);
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
    setParams({
      ...params,
      pageSize,
      pageNum: pageSize !== params.pageSize ? 1 : page,
    });
    getDataFunc();
  };

  return (
    <div className="table-view-wrapper">
      <div className="table-header">
        {
          !!actionButtonList.length && (
            <div className="additional-button-list">
              {
                actionButtonList.map(button => button)
              }
            </div>
          )
        }
      </div>
      <div className="selected-item-label">
        { hasSelected && `Đã chọn ${selectedRowKeys.length} phần tử`}
      </div>
      <Table rowSelection={isAllowSelection ? rowSelection : null}
             columns={tableConfig.columns}
             dataSource={data.items}
             pagination={false}
      />
      <br/>
      {
        isShowPagination && !!data.totalCount && (
          <Pagination
            {...paginationConfig}
            total={data.totalCount}
            showTotal={(total, range) => `${range[0]} - ${range[1]} trong ${total} phần tử.`}
            defaultPageSize={params.pageSize}
            defaultCurrent={params.pageNum}
            showSizeChanger
            onChange={onPaginationChange}
          />
        )
      }
    </div>
  );
}
