import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminBlogCategoriesService } from 'services';
import { authentication, cui, events } from 'utils';
import { Button } from 'antd';
import { PlusCircleOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AddEditBlogCategoriesModal from './AddEditBlogCategoriesModal';
import DeleteBlogCategoriesModal from './DeleteBlogCategoriesModal';
import BoxCard from 'components/Share/BoxCard';
import StatusTag from 'components/Share/StatusTag';
import { PERMISSION_VALUES, RESPONSIVE_MEDIAS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Name',
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
    dataIndex: 'convertedStatus',
    render: (convertedStatus, record) => {
      return (<StatusTag value={record.status} label={convertedStatus}/>);
    }
  },
];

const ACTION_KEYS = {
  ADD_BLOG_CATEGORIES: "ADD_BLOG_CATEGORIES",
  EDIT_BLOG_CATEGORIES: "EDIT_BLOG_CATEGORIES",
  DELETE_BLOG_CATEGORIES: "DELETE_BLOG_CATEGORIES",
}

export default function BlogCategoriesManagementTable() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [openAddBlogCategories, setOpenAddBlogCategories] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteBlogCategories, setOpenDeleteBlogCategories] = useState(false);
  const [selectedBlogCategories, setSelectedBlogCategories] = useState(null);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_BLOG_CATEGORIES_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    className: isMobile && 'box-card--mobile',
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      AdminBlogCategoriesService.getBlogCategories(cui.removeEmpty(params), successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenDeleteBlogCategories(false);
    setOpenAddBlogCategories(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const addBlogCategories = () => {
    setIsEdit(false);
    setOpenAddBlogCategories(true);
  }

  const editBlogCategories = () => {
    setIsEdit(true);
    setOpenAddBlogCategories(true);
  }

  const deleteBlogCategories = () => {
    setOpenDeleteBlogCategories(true);
  }

  const onSelectedItemsChange = (keys) => {
    const newSelectedBlogCategories = ref.current.items.find(item => item.id === keys[0]);
    setSelectedBlogCategories(newSelectedBlogCategories);
  }

  const headerActionsConfig = {
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_BLOG_CATEGORIES} icon={<EditOutlined />} onClick={editBlogCategories}>Edit  blog category</Button>,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_BLOG),
      },      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_BLOG_CATEGORIES} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteBlogCategories}>Delete blog category</Button>,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_BLOG),
      },
      {
        type: 'searchText',
        span: 24,
        requiredSelection: false,
        props: {
          placeholder: 'Search by question...',
        }
      },
      {
        type: 'searchButton',
        requiredSelection: false,
        span: 12,
        props: isMobile && {
          style: { width: '100%' }
        }
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.ADD_BLOG_CATEGORIES} type="primary" icon={<PlusCircleOutlined />} style={{ width: isMobile ? '100%' : 'auto' }}  onClick={addBlogCategories}>Add blog category</Button>,
        span: 12,
        align: 'right',
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_BLOG),
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
                 isAllowSelection={authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_BLOG) ||
                   authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_BLOG)}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openAddBlogCategories && (
          <AddEditBlogCategoriesModal
            open={openAddBlogCategories}
            data={isEdit ? selectedBlogCategories : null}
            onOk={reloadTable}
            onCancel={() => { setOpenAddBlogCategories(false); }}
          />
        )
      }
      {
        openDeleteBlogCategories && (
          <DeleteBlogCategoriesModal
            open={openDeleteBlogCategories}
            data={selectedBlogCategories}
            onOk={reloadTable}
            onCancel={() => { setOpenDeleteBlogCategories(false); }}
          />
        )
      }
    </BoxWrapper>
  );
}
