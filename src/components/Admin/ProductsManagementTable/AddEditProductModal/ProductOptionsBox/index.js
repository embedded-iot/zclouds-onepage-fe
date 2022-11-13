import React, { useState } from 'react';
import { Button, Col, Input, InputNumber, Row } from 'antd';
import { PlusCircleOutlined, CloseOutlined } from '@ant-design/icons';

import './style.scss';

export default function ProductOptionsBox(props) {
  const [options, setOptions] = useState([]);
  const addProductOption = () => {

  }

  return (
    <div className='product-options-box__wrapper'>
      <Row gutter={[20, 20]}>
        {
          options.map((option, optionId) => (
            <Col span={12}>
              <div className='product-options-box__option' key={optionId}>
                <div className='product-options-box__option-remove'>
                  <CloseOutlined />
                </div>
                <div className='product-options-box__title'>
                  Option name
                </div>
                <div className='product-options-box__content'>
                  <Input placeholder="Option name" />
                </div>
                <div className='product-options-box__option-values'>
                  {
                    (option.optionValues || []).map((optionValue, optionValueId) => (
                      <div className='product-options-box__option-value' key={optionValueId}>
                        <Input placeholder="Option name" />
                        <InputNumber min={0} max={10} placeholder="Price" />
                      </div>
                    ))
                  }
                  <Button type="link" icon={<PlusCircleOutlined />}>Add option value</Button>
                </div>
              </div>
            </Col>
          ))
        }
        <Col span={12}>
          <div className='product-options-box__option'>

          </div>
        </Col>
      </Row>
      <Button type="link" icon={<PlusCircleOutlined />} onClick={addProductOption}>Add option</Button>
    </div>
  )
}
