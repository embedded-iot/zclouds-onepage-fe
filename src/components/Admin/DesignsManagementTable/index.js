import React, { useRef, useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import { AdminDesignsService } from 'services';
import { events } from 'utils';
import Icon from 'components/Common/Icon';

import searchGreenIcon from 'images/search_purple_icon.svg';
import BoxCard from 'components/Share/BoxCard';
import { Button } from 'antd';
import EditDesignModal from './EditDesignModal';
import { EditOutlined } from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { RESPONSIVE_MEDIAS } from 'components/contants';


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
    title: 'Owner',
    dataIndex: 'owner',
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
];

export default function DesignsManagementTable({ RELOAD_EVENT_KEY = 'RELOAD_ADMIN_DESIGNS_MANAGEMENT_TABLE_EVENT_KEY' }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [openUpdateDesign, setOpenUpdateDesign] = useState(false);
  let ref = useRef({});
  const tableConfig = {
    className: isMobile && 'box-card--mobile',
    columns,
    getDataFunc: (params, successCallback, failureCallback) => {
      const { pageSize, pageNum, ...restParams} = params || {};
      AdminDesignsService.getDesigns({ ...restParams, pageSize, pageNum }, successCallback, failureCallback)
    },
    successCallback: (response) => {
      ref.current.items = response.items;
    },
    failureCallback: (error) => {
      console.log(error);
    },
  };
  const reloadTable = (filters ={}) => {
    setOpenUpdateDesign(false);
    events.publish(RELOAD_EVENT_KEY, filters);
  }

  const editDesign = () => {
    setOpenUpdateDesign(true);
  }

  const headerActionsConfig = {
    allowRowLayout: isMobile,
    gutter: [10, 10],
    className: isMobile && 'box-card--mobile',
    buttonList: [
      {
        type: 'custom',
        render: <Button icon={<EditOutlined />} onClick={editDesign}>Edit design</Button>,
        requiredSelection: true,
      },
      {
        type: 'searchText',
        span: 24,
        props: {
          placeholder: 'Search by name, creator...',
          theme: 'light',
        },
        requiredSelection: false,
      },
      {
        type: 'pageNum',
        span: 12,
        props: {
          theme: 'light',
        },
        requiredSelection: false,
      },
      {
        type: 'pageSize',
        span: 12,
        props: {
          theme: 'light',
        },
        requiredSelection: false,
      },
      {
        type: 'searchButton',
        span: 12,
        props: {
          style: isMobile ? { width: '100%' } : {},
          ghost: true,
          icon: <Icon src={searchGreenIcon} width={20} height={20} />
        },
        requiredSelection: false,
      },
    ],
  }

  const onSelectedItemsChange = (keys) => {
    const newSelectedDesign = ref.current.items.find(item => item.id === keys[0]);
    setSelectedDesign(newSelectedDesign);
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
                 isAllowSelection={false}
                 isSingleSelection={true}
                 onSelectedItemsChange={onSelectedItemsChange}
                 RELOAD_EVENT_KEY={RELOAD_EVENT_KEY}
      />
      {
        openUpdateDesign && (
          <EditDesignModal
            open={openUpdateDesign}
            data={selectedDesign}
            onOk={reloadTable}
            onCancel={() => { setOpenUpdateDesign(false); }}
          />
        )
      }
    </BoxWrapper>
  );
}
