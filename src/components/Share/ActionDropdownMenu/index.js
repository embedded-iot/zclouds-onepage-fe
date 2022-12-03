import React from 'react';
import DropdownMenu from 'components/Common/DropdownMenu';
import Icon from 'components/Common/Icon';
import actionIcon from 'images/action-icon.svg';
import { events } from 'utils';

import './style.scss';

export default function ActionDropdownMenu({ items = [], record , onMenuClick, children, trigger, placement, ACTION_EVENT_KEY = ''}) {
  const handleMenuClick = (key) => {
    if (!!onMenuClick) {
      onMenuClick(key);
    }
    if (!!ACTION_EVENT_KEY) {
      events.publish(ACTION_EVENT_KEY, {
        key,
        record,
      })
    }
  }

  return (
    <DropdownMenu items={items}
                  onMenuClick={handleMenuClick}
                  trigger={trigger || ['click']}
                  placement={placement}
    >
      {
        !!children ? children : (
          <div className="action-dropdown-menu__button">
            <Icon src={actionIcon} width={24} height={24}/>
          </div>
        )
      }
    </DropdownMenu>
  )
}
