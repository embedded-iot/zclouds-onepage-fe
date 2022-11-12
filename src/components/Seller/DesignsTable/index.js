import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { SellerDesignsService } from 'services';
import { events } from 'utils';
import { Button } from 'antd';
import { PlusCircleOutlined, EditOutlined, CloseCircleOutlined, DownloadOutlined, ImportOutlined } from '@ant-design/icons';
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
    title: 'Owner',
    dataIndex: 'owner',
  },
  {
    title: 'Mockup',
    dataIndex: 'mockup',
    render: (mockup, record) => <img src={mockup} alt={record.name} />,
  },
  {
    title: 'Design',
    dataIndex: 'design',
    render: (mockup, record) => <img src={mockup} alt={record.name} />,
  },
];

const ACTION_KEYS = {
  ADD_DESIGN: "ADD_DESIGN",
  EDIT_DESIGN: "EDIT_DESIGN",
  DELETE_DESIGN: "DELETE_DESIGN",
  DOWNLOAD_DESIGN: "DOWNLOAD_DESIGN",
  IMPORT_DESIGNS: "IMPORT_DESIGNS",
}

export default function DesignsTable() {
  const [openAddDesign, setOpenAddDesign] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteDesign, setOpenDeleteDesign] = useState(false);
  const [openImportDesigns, setOpenImportDesigns] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const RELOAD_EVENT_KEY = 'RELOAD_Seller_DESIGNS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, searchText, ...restParams} = params || {};
      SellerDesignsService.getDesigns({ ...restParams, pageSize, pageNum, searchText }, successCallback, failureCallback)
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

  const deleteDesign = () => {
    setOpenDeleteDesign(true);
  }

  const downloadDesign = () => {
    SellerDesignsService.downloadDesign();
  }

  const importDesigns = () => {
    setOpenImportDesigns(true);
  }

  const onSelectedItemsChange = (keys) => {
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
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_DESIGN} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteDesign}>Delete design</Button>,
        requiredSelection: true,
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DOWNLOAD_DESIGN} icon={<DownloadOutlined />} onClick={downloadDesign}>Delete design</Button>,
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
                 isSingleSelection={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 isAllowSelection={true}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      <AddEditDesignModal
        open={openAddDesign}
        data={isEdit ? selectedDesign : null}
        onOk={reloadTable}
        onCancel={() => { setOpenAddDesign(false); }}
      />
      <DeleteDesignModal
        open={openDeleteDesign}
        data={selectedDesign}
        onOk={reloadTable}
        onCancel={() => { setOpenDeleteDesign(false); }}
      />
      <ImportDesignsModal
        open={openImportDesigns}
        onOk={reloadTable}
        onCancel={() => { setOpenImportDesigns(false); }}
      />
    </>
  );
}
