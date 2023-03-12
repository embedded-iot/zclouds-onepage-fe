import React, {  useState } from 'react';
import { Button, Col, Form, Row } from 'antd';
import {
  RESPONSIVE_MEDIAS,
  STATE_VALUES,
} from 'components/contants';
import InputText from 'components/Common/InputText';
import { AdminProductsService } from 'services';
import { upload } from 'utils';
import UploadBox from 'components/Common/UploadBox';
import ProductOptionsBox from './ProductOptionsBox';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import BoxCard from 'components/Share/BoxCard';
import { useMediaQuery } from 'react-responsive';
import BoxHeader from 'components/Share/BoxHeader';

export default function ProductForm(
  {
    isEdit, form, onFinish, onCancel,
    initialValues,
    redirectTo,
    ...restProps
  }
) {
  const [deletedImages, setDeletedImages] = useState([]);
  const action = AdminProductsService.getUploadProductImageUrl();
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
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

  const buttonList = [
    <Button onClick={handleCancel}>
      Cancel
    </Button>,
    <Button type="primary" htmlType="submit">
      Save
    </Button>
  ];


  const BoxWrapper = isMobile ? 'div' : BoxCard;

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
        sellerId: initialValues && initialValues.sellerId ? initialValues.sellerId : '',
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

      <div className='page-content-box__contents'>
        <BoxWrapper className={!isMobile && 'card-box__wrapper'}>
          <Row gutter={[24, 24]}>
            <Col span={8}>
              <Form.Item
                label="Title"
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Please enter title!',
                  },
                ]}
              >
                <InputText placeholder="Ex: Short denim jeans"  />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Support Email"
                name="supportEmail"
                rules={[
                  {
                    type: 'email',
                    message: 'Email is invalid!',
                  },
                  {
                    required: true,
                    message: 'Please enter email!',
                  },
                ]}
              >
                <InputText placeholder="ex: support@example.com"/>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                name="imageFiles"
                valuePropName="fileList"
                getValueFromEvent={upload.getValueFromEvent}
              >
                <UploadBox action={action}
                           onRemove={handleRemoveImage}
                           selectLabel="Upload Image"
                           selectNote="96 x 96 px"
                           maxFileUpload={10}
                />
              </Form.Item>
            </Col>
          </Row>
        </BoxWrapper>

        <BoxWrapper className={!isMobile && 'card-box__wrapper'}>
          <BoxHeader
            title="Variants"
            align="left"
          />
          <Form.Item
            label=""
            name="productOptions"
            valuePropName="values"
          >
            <ProductOptionsBox onChange={handleProductOptionsChange}/>
          </Form.Item>
        </BoxWrapper>
      </div>
      <div className='page-content-box__footer'>
        <ButtonListWrapper buttonList={buttonList}
                           align="right"
                           className="no-margin"
        />
      </div>
    </Form>
  )
}
