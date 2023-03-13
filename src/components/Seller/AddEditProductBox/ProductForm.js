import React, {  useState } from 'react';
import { Button, Col, Form, Row } from 'antd';
import {
  RESPONSIVE_MEDIAS,
} from 'components/contants';
import InputText from 'components/Common/InputText';
import { SellerFilesService, SellerProductsService } from 'services';
import { events, upload } from 'utils';
import UploadBox from 'components/Common/UploadBox';
import ProductOptionsBox from './ProductOptionsBox';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import BoxCard from 'components/Share/BoxCard';
import { useMediaQuery } from 'react-responsive';
import BoxHeader from 'components/Share/BoxHeader';
import VariantsTable from './VariantsTable';
import VariantsSelectList from './VariantsSelectList';

export default function ProductForm(
  {
    isEdit, form, onFinish, onCancel,
    initialValues,
    redirectTo,
    ...restProps
  }
) {
  const [isAddVariants, setIsAddVariants] = useState(false);
  const [deletedImages, setDeletedImages] = useState([]);
  const action = SellerFilesService.uploadImage();
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
      SellerFilesService.deleteImageByPath(image.url, resolve, reject);
    }));
    Promise.all(promiseUnusedImages).then(() => {
      setDeletedImages([]);
      successCallback();
    })
  }

  const handleFormChange = (name, value) => {
    form.setFieldsValue({
      [name]: value,
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

  const handleValueChanges = (value, values) => {
    if (value.options) {
      const variants = SellerProductsService.generateVariantsFromOptions(value.options);
      const optionValuesSelect = SellerProductsService.generateOptionValuesSelectFromOptions(value.options);
      handleFormChange('variants', variants)
      handleFormChange("optionValuesSelect", optionValuesSelect);
    } else if (value.optionValuesSelect) {
      events.publish("EVENT_OPTION_VALUES_SELECT", { optionValuesSelect: value.optionValuesSelect});
    }
  }

  const showAddVariants = () => {
    handleFormChange('options', [{
      name: 'Size',
      value: []
    }]);
    setIsAddVariants(true);
  }

  const BoxWrapper = isMobile ? 'div' : BoxCard;
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        ...initialValues,
        imageFiles: upload.getFileListFromList((initialValues ? initialValues.convertedProductImages : [])),
        options: [],
        optionValuesSelect: [],
        variants: initialValues ? initialValues.variants : [SellerProductsService.getVariantOption()],
      }}
      onFinish={(values) => {
        removeUnusedImagesBefore(() => {
          onFinish(values);
        }, true)
      }}
      layout="vertical"
      onValuesChange={handleValueChanges}
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
            label={<span className="cursor-pointer" onClick={showAddVariants}>Add Variants</span>}
            name="isAddVariants"
            hidden={isAddVariants}
          >
            <div>If this product has multiple options, like different sizes or colors</div>
          </Form.Item>
          <Form.Item
            label=""
            name="options"
            valuePropName="options"
            hidden={!isAddVariants}
          >
            <ProductOptionsBox />
          </Form.Item>
          <Form.Item
            label="Select"
            name="optionValuesSelect"
            valuePropName="list"
            hidden={!isAddVariants}
          >
            <VariantsSelectList />
          </Form.Item>
          <Form.Item
            label="Preview"
            name="variants"
            valuePropName="variants"
          >
            <VariantsTable />
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
