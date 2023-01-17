import React from 'react';
import DropdownMenu from 'components/Common/DropdownMenu';
import Icon from 'components/Common/Icon';
import defaultActionIcon from 'images/action-icon.svg';
import { events } from 'utils';

import './style.scss';
import { filterListByPermission } from 'services/BaseService';

export default function ActionDropdownMenu({ items = [], record , onMenuClick, children, trigger, placement, actionIcon, ACTION_EVENT_KEY = ''}) {
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
    <DropdownMenu items={filterListByPermission(items)}
                  onMenuClick={handleMenuClick}
                  trigger={trigger || ['click']}
                  placement={placement}
    >
      {
        !!children ? children : (
          <div className="action-dropdown-menu__button">
            <Icon src={actionIcon || defaultActionIcon} width={24} height={24}/>
          </div>
        )
      }
    </DropdownMenu>
  )
}
