import React from 'react';

import './style.scss';

import DropdownMenu from 'components/Common/DropdownMenu';
import { Button } from 'antd';

export default function ButtonListWrapper({
                                            buttonList = [],
                                            actionItems = [],
                                            actionButton = <Button>Actions</Button>,
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
              actionButton
            }
          </DropdownMenu>
        )
      }
    </div>
  )
}
