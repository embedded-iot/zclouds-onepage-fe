import React, { useState, useRef } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminBlogsService } from 'services';
import { authentication, events } from 'utils';
import { Button } from 'antd';
import { PlusCircleOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons';
import AddEditBlogModal from './AddEditBlogModal';
import DeleteBlogModal from './DeleteBlogModal';
import BoxCard from 'components/Share/BoxCard';
import StatusTag from 'components/Share/StatusTag';
import { PERMISSION_VALUES, RESPONSIVE_MEDIAS } from 'components/contants';
import { useMediaQuery } from 'react-responsive';
import PlainText from 'components/Common/PlainText';
import ReactHtmlParser from 'react-html-parser';

const columns = [
  {
    title: 'Image',
    dataIndex: 'featureImage',
    render: (featureImage, record) => <img className="table-img__icon table-img__icon--width-auto" src={featureImage} alt={record.title} />,
  },
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Title',
    dataIndex: 'title',
  },
  {
    title: 'Description',
    dataIndex: 'description',
  },
  {
    title: 'Content',
    dataIndex: 'content',
    render: (content) => {
      return <PlainText type="TextArea">{ReactHtmlParser(content)}</PlainText>
    }
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
  {
    title: 'Updated Date',
    dataIndex: 'convertedUpdatedDate',
  },
];

const ACTION_KEYS = {
  ADD_BLOG: "ADD_BLOG",
  EDIT_BLOG: "EDIT_BLOG",
  DELETE_BLOG: "DELETE_BLOG",
}

export default function BlogsManagementTable() {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [openAddBlog, setOpenAddBlog] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [openDeleteBlog, setOpenDeleteBlog] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const RELOAD_EVENT_KEY = 'RELOAD_ADMIN_BLOGS_TABLE_EVENT_KEY';
  let ref = useRef({});
  const tableConfig = {
    className: isMobile && 'box-card--mobile',
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      AdminBlogsService.getBlogs({ ...restParams, pageSize, pageNum }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };

  const reloadTable = (filters ={}) => {
    setOpenDeleteBlog(false);
    setOpenAddBlog(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const addBlog = () => {
    setIsEdit(false);
    setOpenAddBlog(true);
  }

  const editBlog = () => {
    setIsEdit(true);
    setOpenAddBlog(true);
  }

  const deleteBlog = () => {
    setOpenDeleteBlog(true);
  }

  const onSelectedItemsChange = (keys) => {
    const newSelectedBlog = ref.current.items.find(item => item.id === keys[0]);
    setSelectedBlog(newSelectedBlog);
  }

  const headerActionsConfig = {
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.EDIT_BLOG} icon={<EditOutlined />} onClick={editBlog}>Edit blog</Button>,
        span: 12,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_BLOG),
      },
      {
        type: 'custom',
        render: <Button key={ACTION_KEYS.DELETE_BLOG} icon={<CloseCircleOutlined />} type="primary" danger ghost onClick={deleteBlog}>Delete blog</Button>,
        span: 12,
        requiredSelection: true,
        permission: authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_BLOG),
      },
      {
        type: 'searchText',
        span: 24,
        requiredSelection: false,
        props: {
          placeholder: 'Search by title, description...',
        }
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
        render: <Button key={ACTION_KEYS.ADD_BLOG} type="primary" icon={<PlusCircleOutlined />} style={{ width: isMobile ? '100%' : 'auto' }} onClick={addBlog}>Add blog</Button>,
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
                 isAllowSelection={authentication.getPermission(PERMISSION_VALUES.ADMIN_ADD_EDIT_BLOG) ||
                   authentication.getPermission(PERMISSION_VALUES.ADMIN_DELETE_BLOG)}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openAddBlog && (
          <AddEditBlogModal
            open={openAddBlog}
            data={isEdit ? selectedBlog : null}
            onOk={reloadTable}
            onCancel={() => { setOpenAddBlog(false); }}
          />
        )
      }
      {
        openDeleteBlog && (
          <DeleteBlogModal
            open={openDeleteBlog}
            data={selectedBlog}
            onOk={reloadTable}
            onCancel={() => { setOpenDeleteBlog(false); }}
          />
        )
      }
    </BoxWrapper>
  );
}
