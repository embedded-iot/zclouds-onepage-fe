import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { BaseService, SellerDesignsService } from 'services';
import { download, events, fileHelper } from 'utils';
import { Button, notification } from 'antd';
import { PlusCircleOutlined, EditOutlined, DownloadOutlined, ImportOutlined, FileExcelOutlined } from '@ant-design/icons';
import AddEditDesignModal from './AddEditDesignModal';
import DeleteDesignModal from './DeleteDesignModal';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import ImportDesignsModal from 'components/Seller/DesignsTable/ImportDesignsModal';

const columns = [
  {
    title: '#',
    dataIndex: 'id',
  },
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
    dataIndex: 'mockup',
    render: (mockup, record) => <img className="table-img__icon table-img__icon--circle" src={mockup[0]} alt={record.name} />,
  },
  {
    title: 'Design',
    dataIndex: 'design',
    render: (design, record) => <img className="table-img__icon table-img__icon--circle" src={design[0]} alt={record.name} />,
  },
];

const ACTION_KEYS = {
  ADD_DESIGN: "ADD_DESIGN",
  EDIT_DESIGN: "EDIT_DESIGN",
  DELETE_DESIGN: "DELETE_DESIGN",
  DOWNLOAD_DESIGN: "DOWNLOAD_DESIGN",
  IMPORT_DESIGNS: "IMPORT_DESIGNS",
  EXPORT_DESIGNS: "EXPORT_DESIGNS",
}

export default function DesignsTable() {
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
    setIsEdit(false);
    setOpenAddDesign(true);
  }

  const editDesign = () => {
    setIsEdit(true);
    setOpenAddDesign(true);
  }
// eslint-disable-next-line
  const deleteDesign = () => {
    setOpenDeleteDesign(true);
  }

  const downloadDesign = () => {
    SellerDesignsService.downloadDesign(selectedDesign.id, response => {
      notification.success({
        message: "Download design successful!",
      });
      download(response.url);
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
    const newSelectedDesign = ref.current.items.find(item => item.id === keys[0]);
    setSelectedDesign(newSelectedDesign);
  }

  const headerActionsConfig = {
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_DESIGN} icon={<EditOutlined />} onClick={editDesign}>Edit design</Button>,
        requiredSelection: true,
      },
      // {
      //   type: 'custom',
      //   render: <Button key={ACTION_KEYS.DELETE_DESIGN} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteDesign}>Delete design</Button>,
      //   requiredSelection: true,
      // },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DOWNLOAD_DESIGN} icon={<DownloadOutlined />} onClick={downloadDesign}>Download design</Button>,
        requiredSelection: true,
      },
      {
        type: 'searchText',
        requiredSelection: false,
      },
      {
        type: 'pageNum',
        requiredSelection: false,
      },
      {
        type: 'pageSize',
        requiredSelection: false,
      },
      {
        type: 'searchButton',
        requiredSelection: false,
      },
    ],
  }

  const buttonList = [
      ...(selectedKeys.length ? [<Button key={ACTION_KEYS.EXPORT_DESIGNS} icon={<FileExcelOutlined />} onClick={exportDesigns}>Export</Button>] : []),
    <Button key={ACTION_KEYS.IMPORT_DESIGNS} icon={<ImportOutlined />} onClick={importDesigns}>Upload multi design</Button>,
    <Button key={ACTION_KEYS.ADD_DESIGN} type="primary" icon={<PlusCircleOutlined />} onClick={addDesign}>Add design</Button>
  ]
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
