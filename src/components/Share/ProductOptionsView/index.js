import React, { useState } from 'react';
import DropdownSelect from 'components/Common/DropdownSelect';
import { cui } from 'utils';

import "./style.scss";

export default function ProductOptionsView({ hasLabel = false, selectedSku = '', productOptions = [], onProductOptionsChange }) {
  const [selectedProductOptions, setProductOptions] = useState({});
  const [selectedSkuOptions] = useState(!!selectedSku ? selectedSku.split('|') : []);
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

  const getDefaultSelectedOption = (options, name) => {
    const selectedOption = options.find(option => selectedSkuOptions.includes(option.slug))
    if (!!selectedOption && !selectedProductOptions[name]) {
      setProductOptions(prevState => ({
        ...prevState,
        [name]: selectedOption,
      }))
    }
    return !!selectedOption  ? selectedOption.value : '';
  };
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
              defaultValue={getDefaultSelectedOption(getOptionList(option), option.name)}
              name={option.name}
              onChange={onOptionsChange}
            />
          </div>
        ))
      }
    </div>
  )
}
