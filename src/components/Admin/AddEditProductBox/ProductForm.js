import React, {  useState } from 'react';
import { Button, Col, Form, Row } from 'antd';
import {
  STATE_LABEL_VALUE_OPTIONS, STATE_VALUES,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import InputText from 'components/Common/InputText';
import InputNumber from 'components/Common/InputNumber';
import { AdminProductsService } from 'services';
import { upload } from 'utils';
import UploadBox from 'components/Common/UploadBox';
import ProductOptionsBox from './ProductOptionsBox';

export default function ProductForm(
  {
    isEdit, form, onFinish, onCancel,
    initialValues, categoriesOptions,
    redirectTo,
    ...restProps
  }
) {
  const [deletedImages, setDeletedImages] = useState([]);
  const action = AdminProductsService.getUploadProductImageUrl();
  const handleRemoveImage = (file) => {
    setDeletedImages([
      ...deletedImages,
      file,
    ])
  }

  const removeUnusedImagesBefore = (successCallback = () => {}, submit = false) => {
    const { imageFiles = [] } = form.getFieldsValue();
    const newUploadedImages = imageFiles.map(imageFile => imageFile.response).filter(image =>  image && !image.existing);
    const newUploadedImagesInDeletedImage = deletedImages.filter(image => !image.existing);
    const unusedImages = submit ? deletedImages : [...newUploadedImagesInDeletedImage, ...newUploadedImages];
    if (!unusedImages.length) {
      successCallback();
      return;
    }
    const promiseUnusedImages = unusedImages.map(image => new Promise((resolve, reject) => {
      AdminProductsService.deleteProductImage(image.id, resolve, reject);
    }));
    Promise.all(promiseUnusedImages).then(() => {
      setDeletedImages([]);
      successCallback();
    })
  }

  const handleProductOptionsChange = (options) => {
    form.setFieldsValue({
      productOptions: options,
    });
  }

  const handleCancel = () => {
    removeUnusedImagesBefore(() => {
      onCancel();
    })
  }

  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        state: STATE_VALUES.ACTIVATED,
        categoryId: '',
        price: 0,
        displayOrder: 0,
        ...initialValues,
        imageFiles: upload.getFileListFromList((initialValues ? initialValues.convertedProductImages : [])),
        productOptions: AdminProductsService.buildProductOptions(initialValues ? initialValues.productOptions : []),
      }}
      onFinish={(values) => {
        removeUnusedImagesBefore(() => {
          onFinish(values);
        }, true)
      }}
      layout="vertical"
      {...restProps}
    >
      <Row gutter={[42, 0]}>
        <Col span={12}>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item
                label="Product name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter product name!',
                  },
                ]}
              >
                <InputText placeholder="Product name"  />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="SKU"
                name="slug"
                rules={[
                  {
                    required: true,
                    message: 'Please enter SKU!',
                  },
                ]}
              >
                <InputText placeholder="Slug" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item
                label="Price"
                name="price"
                rules={[
                  {
                    required: true,
                    message: 'Please enter price!',
                  },
                ]}
              >
                <InputNumber min={0} placeholder="Price"  />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Display Order"
                name="displayOrder"
              >
                <InputNumber min={0} placeholder="Display Order"  />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Note"
            name="note"
          >
            <InputText placeholder="Note" />
          </Form.Item>
          <Form.Item
            label="Design URL"
            name="designUrl"
            rules={[
              {
                type: 'url',
                message: 'Url invalid!',
              },
            ]}
          >
            <InputText placeholder="..."  />
          </Form.Item>
          <Form.Item
            label="Images"
            name="imageFiles"
            valuePropName="fileList"
            getValueFromEvent={upload.getValueFromEvent}
          >
            <UploadBox action={action}
                       onRemove={handleRemoveImage}
                       selectLabel="Choose product image"
                       maxFileUpload={10}
            />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <InputText placeholder="Description"
                       type="TextArea"
                       rows={4}
            />
          </Form.Item>

          <Row gutter={[24, 24]}>
            <Col span={12}>
              <Form.Item
                label="Category"
                name="categoryId"
                rules={[
                  {
                    required: true,
                    message: 'Please select category!',
                  },
                ]}
              >
                <DropdownSelect
                  options={categoriesOptions}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="State"
                name="state"
                rules={[
                  {
                    required: true,
                    message: 'Please select state!',
                  },
                ]}
              >
                <DropdownSelect
                  options={STATE_LABEL_VALUE_OPTIONS}
                />
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Form.Item
            label="Add variants for product"
            name="productOptions"
            valuePropName="productOptions"
          >
            <ProductOptionsBox onChange={handleProductOptionsChange}/>
          </Form.Item>
        </Col>
      </Row>
      <div className='add-edit-product-box__button-list'>
        <Button onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </div>
    </Form>
  )
}
