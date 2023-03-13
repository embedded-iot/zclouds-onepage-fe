import React, { useEffect, useState } from 'react';
import TableGrid from 'components/Common/TableGrid';
import InputText from 'components/Common/InputText';
import InputNumber from 'components/Common/InputNumber';

import './style.scss';
import { events } from 'utils';

export default function VariantsTable({ variants = [], onChange, ...restProps }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const handleInputChange = (value, name, id) => {
    onChange(variants.map(item => item.id === id ? ({
      ...item,
      [name]: value,
    }) : item));
  }

  const columns = [
    {
      title: 'Variant',
      dataIndex: 'images',
      render: (images, record) => {
        return 'images';
      }
    },
    {
      title: 'Properties',
      dataIndex: 'options',
      render: (options, record) => {
        const optionValues = (options || []).map(item => item.value).join(' / ');
        return optionValues || 'Default title';
      }
    },
    {
      title: 'Price',
      dataIndex: 'defaultPrice',
      render: (defaultPrice, record) => {
        return (
          <InputNumber
            value={defaultPrice}
            name="defaultPrice"
            placeholder="Price"
            theme="light"
            min={0}
            onChange={(value, name) => handleInputChange(value, name, record.id)}
          />
        )
      }
    },
    {
      title: 'Compared Price',
      dataIndex: 'comparedPrice',
      render: (comparedPrice, record) => {
        return (
          <InputNumber
            value={comparedPrice}
            name="comparedPrice"
            placeholder="Compared Price"
            theme="light"
            min={0}
            onChange={(value, name) => handleInputChange(value, name, record.id)}
          />
        )
      }
    },
    {
      title: 'Product Cost',
      dataIndex: 'productCost',
      render: (productCost, record) => {
        return (
          <InputNumber
            value={productCost}
            name="productCost"
            placeholder="Product Cost"
            theme="light"
            min={0}
            onChange={(value, name) => handleInputChange(value, name, record.id)}
          />
        )
      }
    },
    {
      title: 'Fulfillment Cost',
      dataIndex: 'fulfillmentCost',
      render: (productCost, record) => {
        return (
          <InputNumber
            value={productCost}
            name="fulfillmentCost"
            placeholder="Fulfillment Cost"
            theme="light"
            onChange={(value, name) => handleInputChange(value, name, record.id)}
          />
        )
      }
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
      render: (sku, record) => {
        return (
          <InputText
            name="sku"
            placeholder="SKU"
            value={sku}
            onChange={(value, name) => handleInputChange(value, name, record.id)}
            style={{minWidth: 130}}
            theme="light"
          />
        )
      }
    },
  ];

  const tableConfig = {
    columns,
  };

  const onSelectedItemsChange = (keys) => {
    setSelectedRowKeys(keys);
  }

  useEffect(() => {
    const reloadListener = events.subscribe('EVENT_OPTION_VALUES_SELECT', ({ optionValuesSelect = [] }) => {
      const selectedOptionValues = optionValuesSelect.filter(optionValue => optionValue.value).map(optionValue => optionValue.label);
      const transformedVariants = variants.map(variant => ({
        ...variant,
        optionValues: variant.options.map(optionValue => optionValue.value)
      }));
      const selectedVariants = transformedVariants.filter(variant => {
        if (selectedOptionValues.length === optionValuesSelect.length) return true;
        if (selectedOptionValues.length === 0) return false;
        return selectedOptionValues.every(elem => variant.optionValues.includes(elem));
      });
      setSelectedRowKeys(selectedVariants.map(variant => variant.id));
    });
    return () => {
      reloadListener.remove();
    }
    // eslint-disable-next-line
  }, [variants])
  return (
    <TableGrid configs={tableConfig}
               defaultData={{
                 items: variants,
               }}
               isAllowUpdateDefaultData={true}
               isAllowSelection={true}
               isAllowUpdateDefaultSelectedRowKeys={true}
               defaultSelectedRowKeys={selectedRowKeys}
               onSelectedItemsChange={onSelectedItemsChange}
    />
  );
}
