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
                                            className = '',
                                            fullWidth = false,
                                            ...restProps
}) {
  return (
    <div className={`button-list__wrapper ${className} ${!!align && ('button-list__wrapper--' + align)} ${fullWidth && 'button-list__wrapper--full-width'}`}>
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
