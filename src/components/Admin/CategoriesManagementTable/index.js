import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminCategoriesService } from 'services';
import { authentication, events } from 'utils';
import { Button } from 'antd';
import { PlusCircleOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AddEditCategoryModal from './AddEditCategoryModal';
import DeleteCategoryModal from './DeleteCategoryModal';
import BoxCard from 'components/Share/BoxCard';
import StatusTag from 'components/Share/StatusTag';
import { PERMISSION_VALUES, RESPONSIVE_MEDIAS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';

const columns = [
  {
    title: 'Image',
    dataIndex: 'featureImage',
    render: (featureImage, record) => <img className="table-img__icon table-img__icon--circle" src={featureImage} alt={record.name} />,
  },
  {
    title: 'Category Name',
    dataIndex: 'name',
  },
  {
    title: 'Slug',
    dataIndex: 'slug',
  },
  {
    title: 'Display order',
    dataIndex: 'displayOrder',
  },
  {
    title: 'Status',
    dataIndex: 'convertedState',
    render: (convertedStatus, record) => {
      return (<StatusTag value={record.state} label={convertedStatus}/>);
    }
  },
];

const ACTION_KEYS = {
  ADD_CATEGORY: "ADD_CATEGORY",
  EDIT_CATEGORY: "EDIT_CATEGORY",
  DELETE_CATEGORY: "DELETE_CATEGORY",
}

export default function CategoriesManagementTable() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_CATEGORIES_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    className: isMobile && 'box-card--mobile',
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      AdminCategoriesService.getCategories({ ...restParams, pageSize, pageNum }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenDeleteCategory(false);
    setOpenAddCategory(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const addCategory = () => {
    setIsEdit(false);
    setOpenAddCategory(true);
  }

  const editCategory = () => {
    setIsEdit(true);
    setOpenAddCategory(true);
  }

  const deleteCategory = () => {
    setOpenDeleteCategory(true);
  }

  const onSelectedItemsChange = (keys) => {
    const newSelectedCategory = ref.current.items.find(item => item.id === keys[0]);
    setSelectedCategory(newSelectedCategory);
  }

  const headerActionsConfig = {
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_CATEGORY} icon={<EditOutlined />} onClick={editCategory}>Edit category</Button>,
        span: 12,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_CATEGORY),
      },      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_CATEGORY} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteCategory}>Delete category</Button>,
        span: 12,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_CATEGORY),
      },
      {
        type: 'custom',
        render: <div></div>,
        span: isMobile ? 0 : undefined,
        requiredSelection: false,
      },
      {
        type: 'pageNum',
        span: 12,
        requiredSelection: false,
        align: 'right',
      },
      {
        type: 'pageSize',
        span: 12,
        requiredSelection: false,
        align: 'right',
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.ADD_CATEGORY} type="primary" icon={<PlusCircleOutlined />} style={{ width: isMobile ? '100%' : 'auto' }} onClick={addCategory}>Add category</Button>,
        span: 12,
        align: 'right',
      }
    ],
  }
  const BoxWrapper = isMobile ? 'div' : BoxCard;
  return (
    <BoxWrapper className={!isMobile && 'content-box__wrapper'}>
      <TableGrid configs={tableConfig}
                 headerActionsConfig={headerActionsConfig}
                 paginationConfig={{}}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={true}
                 isSingleSelection={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 isAllowSelection={authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_CATEGORY) ||
                   authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_CATEGORY)}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openAddCategory && (
          <AddEditCategoryModal
            open={openAddCategory}
            data={isEdit ? selectedCategory : null}
            onOk={reloadTable}
            onCancel={() => { setOpenAddCategory(false); }}
          />
        )
      }
      {
        openDeleteCategory && (
          <DeleteCategoryModal
            open={openDeleteCategory}
            data={selectedCategory}
            onOk={reloadTable}
            onCancel={() => { setOpenDeleteCategory(false); }}
          />
        )
      }
    </BoxWrapper>
  );
}
