import React, { useState } from 'react';
import { Button, Col, Row } from 'antd';
import InputText from 'components/Common/InputText';
import InputTags from 'components/Common/InputTags';
import {
  DeleteOutlined,
  PlusCircleFilled,
} from '@ant-design/icons';


import './style.scss';

export default function ProductOptionsBox({ values, onChange }) {
  const [options, setOptions] = useState(values || [
    {
      name: '',
      values: []
    }
  ]);

  const addOption = () => {
    setOptions([...options, {
      name: '',
      values: [],
    }]);
  }

  const updateOptions = options => {
    setOptions(options);
    onChange(options);
  }

  const removeOption = (optionId) => {
    updateOptions(options.filter((option, index) => index !== optionId ))
  }

  const updateOption = (value = {}, name, optionId,) => {
    updateOptions(options.map((option, optionIndex) => {
      return optionIndex !== optionId ? option : ({
        ...option,
        [name]: value
      })
    }))
  }
  return (
    <div className='product-options-box__wrapper'>
      <Row gutter={[16, 16]}>
        <Col span={10}>
          <div className='product-options-box__option-label'>Option name</div>
        </Col>
        <Col span={10}>
          <div className='product-options-box__option-label'>Option values</div>
        </Col>
      </Row>
      {
        options.map((option, optionId) => (
          <Row gutter={[16, 16]} className='product-options-box__option' key={optionId}>
            <Col span={10} className="product-options-box__option-value">
              <InputText placeholder="e.g. Size..."
                         value={option.name}
                         name={'name'}
                         theme="light"
                         onChange={(value, name) => updateOption(value, name, optionId)}
              />
            </Col>
            <Col span={10} className="product-options-box__option-value">
              <InputTags placeholder="Enter to add option"
                         value={option.values}
                         name={'values'}
                         theme="light"
                         onChange={(value, name) => updateOption(value, name, optionId)}
              />
            </Col>
            <Col span={4} className="product-options-box__option-value">
              <Button icon={<DeleteOutlined />} onClick={() => removeOption(optionId)}>
                Delete
              </Button>
            </Col>
          </Row>
        ))
      }
      <Row gutter={[16, 16]}>
        <Col span={10}>
          <div className="product-options-box__add-button" onClick={addOption}>
            <Button type='link' icon={<PlusCircleFilled />}>Add other option</Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}
