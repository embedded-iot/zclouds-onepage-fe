import React from 'react';
import DropdownSelect from 'components/Common/DropdownSelect';

import "./style.scss";

export default function ProductOptionsView({ productOptions = []}) {
  const getOptionList = (option => {
    return ([
      { label : option.name, value: '' },
      ...((option.productOptionValues || []).map(optionValue => ({
        label : optionValue.value, value: optionValue.id
      })))
    ])
  })
  return (
    <div className='product-options-view__wrapper'>
      {
        productOptions.map((option, index) => (
          <div key={option.id || index}>
            <DropdownSelect
              options={getOptionList(option)}
              defaultValue={''}
            />
          </div>
        ))
      }
    </div>
  )
}
