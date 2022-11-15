import React, { useState } from 'react';
import DropdownSelect from 'components/Common/DropdownSelect';

import "./style.scss";

export default function ProductOptionsView({ productOptions = [], onProductOptionsChange }) {
  const [selectedProductOptions, setProductOptions] = useState({});
  const getOptionList = (option => {
    return ([
      { label : option.name, value: '' },
      ...((option.productOptionValues || []).map(optionValue => ({
        label : optionValue.value, value: optionValue.id
      })))
    ])
  });
// eslint-disable-next-line
  const onOptionsChange = (name, value) => {
    const newSelectedProductOptions = {
      ...selectedProductOptions,
      [name]: value,
    }
    setProductOptions(newSelectedProductOptions);
  }

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
