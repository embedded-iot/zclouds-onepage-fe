import React, { useState, useRef, useEffect } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { BaseService, SellerDesignsService } from 'services';
import { download, events, fileHelper } from 'utils';
import { Button, notification } from 'antd';
import { EditOutlined, DownloadOutlined, FileExcelOutlined } from '@ant-design/icons';
import AddEditDesignModal from './AddEditDesignModal';
import DeleteDesignModal from './DeleteDesignModal';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import ImportDesignsModal from 'components/Seller/DesignsTable/ImportDesignsModal';
import Icon from 'components/Common/Icon';
import searchGreenIcon from 'images/search_green.svg';
import downloadGreenIcon from 'images/export_green_icon.svg';
import ActionDropdownMenu from 'components/Share/ActionDropdownMenu';
import plusIcon from 'images/plus-icon.svg';

const columns = [
  {
    title: 'Design Name',
    dataIndex: 'name',
  },
  {
    title: 'Type',
    dataIndex: 'type',
  },
  {
    title: 'Mockup',
    dataIndex: 'mockupFeatureImage',
    render: (mockupFeatureImage, record) => <img className="table-img__icon table-img__icon--circle" src={mockupFeatureImage} alt={record.name} />,
  },
  {
    title: 'Design',
    dataIndex: 'designFeatureImage',
    render: (designFeatureImage, record) => <img className="table-img__icon table-img__icon--circle" src={designFeatureImage} alt={record.name} />,
  },
  {
    title: 'Action',
    dataIndex: 'id',
    render: (id, record) => {
      return <ActionDropdownMenu items={actionItems} record={record} ACTION_EVENT_KEY={ACTION_KEYS.ACTION_EVENTS} />
    }
  },
];

const ACTION_KEYS = {
  ACTION_EVENTS: "DESIGN_ACTION_EVENTS",
  ADD_DESIGN: "ADD_DESIGN",
  EDIT_DESIGN: "EDIT_DESIGN",
  DOWNLOAD_DESIGN: "DOWNLOAD_DESIGN",
  IMPORT_DESIGNS: "IMPORT_DESIGNS",
  EXPORT_DESIGNS: "EXPORT_DESIGNS",
}

const actionItems = [
  {
    key: ACTION_KEYS.EDIT_DESIGN,
    label: "Edit design",
    icon: <EditOutlined />,
  },
  {
    key: ACTION_KEYS.DOWNLOAD_DESIGN,
    label: "Download design",
    icon: <DownloadOutlined />,
  },
];

export default function DesignsTable({ successCallback = () => {} }) {
  const [openAddDesign, setOpenAddDesign] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteDesign, setOpenDeleteDesign] = useState(false);
  const [openImportDesigns, setOpenImportDesigns] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const RELOAD_EVENT_KEY = 'RELOAD_Seller_DESIGNS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      SellerDesignsService.getDesigns({ ...restParams, pageSize, pageNum }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      successCallback(response);
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenDeleteDesign(false);
    setOpenAddDesign(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const addDesign = () => {
    setSelectedDesign(null);
    setIsEdit(false);
    setOpenAddDesign(true);
  }

  const editDesign = (selectedDesign) => {
    setSelectedDesign(selectedDesign);
    setIsEdit(true);
    setOpenAddDesign(true);
  }
// eslint-disable-next-line
  const deleteDesign = () => {
    setOpenDeleteDesign(true);
  }

  const downloadDesign = (selectedDesign) => {
    SellerDesignsService.downloadDesign(selectedDesign.id, response => {
      notification.success({
        message: "Download design successful!",
      });
      response && download(response.url);
    }, error => {
      notification.error({
        message: BaseService.getErrorMessage(error, "Download design failure!"),
      });
    });
  }

  const exportDesigns = () => {
    const selectedDesigns = ref.current.items.filter(item => selectedKeys.includes(item.id)).map(design => ({
      ...design,
      mockup: design.mockup.join(','),
      design: design.design.join(','),
    }));
    fileHelper.exportToExcel(selectedDesigns, 'designs')
  }

  const importDesigns = () => {
    setOpenImportDesigns(true);
  }

  const onSelectedItemsChange = (keys) => {
    setSelectedKeys(keys);
  }

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'searchText',
        props: {
          placeholder: 'Search by name, creator...',
          theme: 'light',
        }
      },
      {
        type: 'pageNum',
        props: {
          theme: 'light',
        }
      },
      {
        type: 'pageSize',
        props: {
          theme: 'light',
        }
      },
      {
        type: 'searchButton',
        props: {
          ghost: true,
          icon: <Icon src={searchGreenIcon} width={20} height={20} />
        }
      },
    ],
  }

  const buttonList = [
      ...(selectedKeys.length ? [<Button key={ACTION_KEYS.EXPORT_DESIGNS} icon={<FileExcelOutlined />} onClick={exportDesigns}>Export</Button>] : []),
    <Button key={ACTION_KEYS.IMPORT_DESIGNS} type="primary" ghost icon={<Icon src={downloadGreenIcon} width={24} height={24} />} onClick={importDesigns}>Upload multi design</Button>,
    <Button key={ACTION_KEYS.ADD_DESIGN} type="primary" icon={<Icon src={plusIcon} width={24} height={24} />} onClick={addDesign}>Create design sku</Button>
  ]

  const actionListenerFunc = () => {
    let reloadListener = null;
    reloadListener = events.subscribe(ACTION_KEYS.ACTION_EVENTS, ({ key, record }) => {
      switch (key) {
        case ACTION_KEYS.EDIT_DESIGN:
          editDesign(record);
          break;
        case ACTION_KEYS.DOWNLOAD_DESIGN:
          downloadDesign(record);
          break;
        default:
      }
    });
    return reloadListener;
  }

  useEffect(() => {
    const reloadListener = actionListenerFunc();
    return () => {
      reloadListener && reloadListener.remove();
    };
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
      />
      <TableGrid configs={tableConfig}
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={true}
                 // isSingleSelection={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 isAllowSelection={true}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openAddDesign && (
          <AddEditDesignModal
            open={openAddDesign}
            data={isEdit ? selectedDesign : null}
            onOk={reloadTable}
            onCancel={() => { setOpenAddDesign(false); }}
            downloadDesign={downloadDesign}
          />
        )
      }
      {
        openDeleteDesign && (
          <DeleteDesignModal
            open={openDeleteDesign}
            data={selectedDesign}
            onOk={reloadTable}
            onCancel={() => { setOpenDeleteDesign(false); }}
          />
        )
      }
      {
        openImportDesigns && (
          <ImportDesignsModal
            open={openImportDesigns}
            onOk={reloadTable}
            onCancel={() => { setOpenImportDesigns(false); }}
          />
        )
      }
    </>
  );
}
