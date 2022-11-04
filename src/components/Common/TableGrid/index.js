import React, { useCallback, useEffect, useState } from 'react';
import { Pagination, Table } from 'antd';
import Grid from 'components/Common/Grid';
import { events } from 'utils';

import './style.scss';

export default function TableGrid({
                                    type = 'table',
                                    configs = {},
                                    paginationConfig = {},
                                    actionButtonList = [],
                                    defaultParams = {},
                                    defaultData = {},
                                    onSelectedItemsChange = () => {},
                                    onSelectGridItem = () => {},
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
      { hasSelected && <div className="selected-item-label">{`Đã chọn ${selectedRowKeys.length} phần tử`}</div>}
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
