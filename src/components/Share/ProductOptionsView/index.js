import React, { useState } from 'react';
import DropdownSelect from 'components/Common/DropdownSelect';

import "./style.scss";
import { cui } from 'utils';

export default function ProductOptionsView({ hasLabel = false, productOptions = [], onProductOptionsChange }) {
  const [selectedProductOptions, setProductOptions] = useState({});
  const getOptionList = (option => {
    return ([
      { label : `Select ${option.name.toLowerCase()}`, value: '' },
      ...((option.productOptionValues || []).map(optionValue => ({
        ...optionValue,
        label : optionValue.value,
        value: optionValue.id
      })))
    ])
  });
// eslint-disable-next-line
  const onOptionsChange = (value, name, selectedOption) => {
    let newSelectedProductOptions;
    if (!value) {
      newSelectedProductOptions = {
        ...selectedProductOptions,
      };
      delete newSelectedProductOptions[name];
    } else {
      newSelectedProductOptions = {
        ...selectedProductOptions,
        [name]: selectedOption,
      }
    }

    setProductOptions(newSelectedProductOptions);
    onProductOptionsChange(newSelectedProductOptions);
  }

  return (
    <div className='product-options-view__wrapper'>
      {
        productOptions.map((option, index) => (
          <div key={option.id || index}>
            { hasLabel && <div className="product-options-view__label">{cui.toCapitalizeCase(option.name)}</div>}
            <DropdownSelect
              options={getOptionList(option)}
              defaultValue={''}
              name={option.name}
              onChange={onOptionsChange}
            />
          </div>
        ))
      }
    </div>
  )
}
