import React, { useState } from 'react';
import { Button, Col, InputNumber, Row } from 'antd';
import { PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';
import InputText from 'components/Common/InputText';

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
            <Col span={12}>
              <div className='product-options-box__option' key={optionId}>
                <div className='product-options-box__option-remove'>
                  <CloseOutlined onClick={() => removeOption(optionId)}/>
                </div>
                <div className='product-options-box__title'>
                  Option name ({optionId + 1})
                </div>
                <div className='product-options-box__content'>
                  <InputText placeholder="Option name"
                             value={option.name}
                             name={optionId}
                             onChange={(value, name) => updateOption(value, optionId)}
                  />
                </div>
                <div className='product-options-box__option-values'>
                  {
                    (option.productOptionValues || []).map((optionValue, optionValueId) => (
                      <div className='product-options-box__option-value' key={optionValueId}>
                        <div className='product-options-box__option-value-title'>
                          Option value ({optionValueId + 1})
                        </div>
                        <div className='product-options-box__option-value-content'>
                          <InputText placeholder="Option value name"
                                     value={optionValue.value}
                                     name={'value'}
                                     onChange={(value, name) => updateOptionValue(value, name, optionId, optionValueId)}
                          />
                          <InputNumber min={0}
                                       placeholder="Price"
                                       value={optionValue.priceAdjustment}
                                       onChange={(value) => updateOptionValue(value, 'priceAdjustment', optionId, optionValueId)}
                          />
                          <div className='product-options-box__option-value-remove'>
                            <CloseOutlined onClick={() => removeOptionValue(optionId, optionValueId)}/>
                          </div>
                        </div>
                      </div>
                    ))
                  }
                  <Button type="link" icon={<PlusCircleOutlined />} onClick={() => addOptionValue(optionId)}>Add option value</Button>
                </div>
              </div>
            </Col>
          ))
        }
        <Col span={12}>
          <div className='product-options-box__option'>
            <Button type="link" icon={<PlusCircleOutlined />} onClick={addOption}>Add option</Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}
