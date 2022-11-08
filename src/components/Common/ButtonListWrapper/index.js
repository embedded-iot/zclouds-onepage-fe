import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import DropdownMenu from 'components/Common/DropdownMenu';
import { Button } from 'antd';

import './style.scss';


export default function ButtonListWrapper({
                                            buttonList = [],
                                            actionItems = [],
                                            actionButton = '',
                                            onActionItemClick = () => {},
                                            align = '',
                                            ...restProps
}) {
  return (
    <div className={`button-list__wrapper ${!!align && ('button-list__wrapper--' + align)}`}>
      {
        !!buttonList.length && buttonList.map(button => button)
      }
      {
        !!actionItems.length && (
          <DropdownMenu items={actionItems}
                        onMenuClick={onActionItemClick}
          >
            {
              !!actionButton ? actionButton : (
                <Button>
                  Actions
                  <DownOutlined />
                </Button>
              )
            }
          </DropdownMenu>
        )
      }
    </div>
  )
}
