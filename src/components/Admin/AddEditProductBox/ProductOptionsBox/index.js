import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import InputText from 'components/Common/InputText';
import InputNumber from 'components/Common/InputNumber';
import Icon from 'components/Common/Icon';
import closeBlack from 'images/close-black-icon.svg';
import plusBlack from 'images/plus-black-icon-1.svg';

import './style.scss';

export default function ProductOptionsBox({ productOptions = [], onChange }) {
  const [options, setOptions] = useState(productOptions);
  const getNextOptionDisplayOrder = () => {
    let maxDisplayOrder = 0;
    options.forEach(option => {
      if (option.displayOrder > maxDisplayOrder) {
        maxDisplayOrder = option.displayOrder;
      }
    })
    return maxDisplayOrder + 1;
  }

  const getNextOptionValueDisplayOrder = (optionId) => {
    let maxDisplayOrder = 0;
    const selectedOption = options.find((option, optionIndex) => optionIndex === optionId);
    selectedOption.productOptionValues.forEach(optionValue => {
      if (optionValue.displayOrder > maxDisplayOrder) {
        maxDisplayOrder = optionValue.displayOrder;
      }
    })
    return maxDisplayOrder + 1;
  }

  const addOption = () => {
    setOptions([...options, {
      id: 0,
      name: '',
      displayOrder: getNextOptionDisplayOrder(),
      productOptionValues: [],
    }]);
  }

  const updateOptions = options => {
    setOptions(options);
    onChange(options);
  }

  const removeOption = (optionId) => {
    updateOptions(options.filter((option, optionIndex) => optionIndex !== optionId ))
  }

  const updateOption = (value, optionId) => {
    updateOptions(options.map((option, optionIndex) => {
      return optionIndex !== optionId ? option : ({
        ...option,
        name: value,
      })
    }))
  }

  const addOptionValue = (optionId) => {
    const newOptions = options.map((option, optionIndex) => {
      return optionIndex !== optionId ? option : ({
        ...option,
        productOptionValues: [...(option.productOptionValues || []), {
          id: 0,
          value: '',
          displayOrder: getNextOptionValueDisplayOrder(optionId),
          priceAdjustment: 0,
        }]
      })
    })
    updateOptions(newOptions);
  }

  const updateOptionValue = (value, name, optionId, optionValueId) => {
    const newOptions = options.map((option, optionIndex) => {
      return optionIndex !== optionId ? option : ({
        ...option,
        productOptionValues: [...(option.productOptionValues || [])].map((optionValue, optionValueIndex) => {
          return optionValueIndex !== optionValueId ? optionValue : {
            ...optionValue,
            [name]: value,
          }
        }),
      })
    })
    updateOptions(newOptions);
  }

  const removeOptionValue = (optionId, optionValueId) => {
    const newOptions = options.map((option, optionIndex) => {
      return optionIndex !== optionId ? option : ({
        ...option,
        productOptionValues: [...(option.productOptionValues || [])].filter((optionValue, optionValueIndex) => optionValueIndex !== optionValueId),
      })
    })
    updateOptions(newOptions);
  }

  return (
    <div className='product-options-box__wrapper'>
      <Row gutter={[20, 20]}>
        {
          options.map((option, optionId) => (
            <Col span={24}>
              <div className='product-options-box__option' key={optionId}>
                <div className='product-options-box__option-remove'>
                  <Icon className="cursor-pointer" src={closeBlack} height={18} width={18} onClick={() => removeOption(optionId)}/>
                </div>
                <div className='product-options-box__title'>
                  Variant name ({optionId + 1})
                </div>
                <div className='product-options-box__content'>
                  <InputText placeholder="e.g. Size..."
                             value={option.name}
                             name={optionId}
                             theme="light"
                             onChange={(value, name) => updateOption(value, optionId)}
                  />
                </div>
                <div className='product-options-box__option-values'>
                  {
                    (option.productOptionValues || []).map((optionValue, optionValueId) => (
                      <div className='product-options-box__option-value' key={optionValueId}>
                        <div className='product-options-box__option-value-title'>
                          Variant value ({optionValueId + 1})
                        </div>
                        <div className='product-options-box__option-value-content'>
                          <InputText placeholder="e.g. S/M/L/XL..."
                                     value={optionValue.value}
                                     name={'value'}
                                     theme="light"
                                     onChange={(value, name) => updateOptionValue(value, name, optionId, optionValueId)}
                          />
                          <InputNumber min={0}
                                       placeholder="Price"
                                       value={optionValue.priceAdjustment}
                                       theme="light"
                                       onChange={(value) => updateOptionValue(value, 'priceAdjustment', optionId, optionValueId)}
                          />
                          <div className='product-options-box__option-value-remove'>
                            <Icon className="cursor-pointer" src={closeBlack} height={18} width={18} onClick={() => removeOptionValue(optionId, optionValueId)}/>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                  <Button type="link" className="product-options-box__add-button product-options-box__add-button--margin-top" icon={<Icon src={plusBlack} height={18} width={18} />} onClick={() => addOptionValue(optionId)}>Add new variant value</Button>
                </div>
              </div>
            </Col>
          ))
        }
        <Col span={24}>
          <div className='product-options-box__option product-options-box__option--select-box'>
            <Button type="link" className="product-options-box__add-button" icon={<Icon src={plusBlack} height={18} width={18} />} onClick={addOption}>Add new variant</Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}
