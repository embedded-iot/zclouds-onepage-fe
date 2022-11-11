import React, { useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminCategoriesService } from 'services';
import { events } from 'utils';
import { Button } from 'antd';
import AddEditCategoryModal from './AddEditCategoryModal';
import DeleteCategoryModal from './DeleteCategoryModal';

const columns = [
  {
    title: '#',
    dataIndex: 'id',
  },
  {
    title: 'Image',
    dataIndex: 'avatar',
    render: (avatar, record) => <img src={avatar} alt={record.name} />,
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
    title: 'State',
    dataIndex: 'convertedState',
  },
];

const ACTION_KEYS = {
  ADD_CATEGORY: "ADD_CATEGORY",
  EDIT_CATEGORY: "EDIT_CATEGORY",
  DELETE_CATEGORY: "DELETE_CATEGORY",
}

export default function CategoriesManagementTable() {
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteCategory, setOpenDeleteCategory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_CATEGORIES_TABLE_EVENT_KEY';
  const tableConfig = {
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, searchText, ...restParams} = params || {};
      AdminCategoriesService.getCategories({ ...restParams, pageSize, pageNum, searchText }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      console.log(response);
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

  const onActionItemClick = (key) => {
    switch (key) {
      case ACTION_KEYS.DELETE_CATEGORY:
        setOpenDeleteCategory(true);
        break;
      default:
        setIsEdit(true);
        setOpenAddCategory(true);
    }
  }

  const onSelectedItemsChange = (keys) => {
    setSelectedCategory({});
  }

  const buttonListWrapperConfig = {
    buttonList: [
      <Button key={ACTION_KEYS.ADD_CATEGORY} onClick={addCategory}>Add category</Button>
    ],
    actionItems: [
      {
        key: ACTION_KEYS.EDIT_CATEGORY,
        label: 'Edit category',
      },
      {
        key: ACTION_KEYS.DELETE_CATEGORY,
        label: 'Delete category',
      },
    ],
    onActionItemClick,
    align: 'right',
  }

  return (
    <>
      <TableGrid configs={tableConfig}
                 paginationConfig={{}}
                 buttonListWrapperConfig={buttonListWrapperConfig}
                 defaultParams={{}}
                 defaultData={{}}
                 isShowPagination={true}
                 isShowSearch={true}
                 isShowPageNum={true}
                 isShowPageSize={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 isAllowSelection={true}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      <AddEditCategoryModal
        open={openAddCategory}
        data={isEdit ? selectedCategory : null}
        onOk={reloadTable}
        onCancel={() => { setOpenAddCategory(false); }}
      />
      <DeleteCategoryModal
        open={openDeleteCategory}
        data={selectedCategory}
        onOk={reloadTable}
        onCancel={() => { setOpenDeleteCategory(false); }}
      />
    </>
  );
}
