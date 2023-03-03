import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'antd';
import InputText from 'components/Common/InputText';
import { STATE_VALUES } from 'components/contants';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import { upload } from 'utils';
import UploadBox from 'components/Common/UploadBox';
import { AdminProductsService } from 'services';


export default function DomainTemplateForm({ form, initialValues, onFinish, onCancel }) {
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

  const handleCancel = () => {
    removeUnusedImagesBefore(() => {
      onCancel();
    })
  }

  const buttonList = [
    <Button onClick={handleCancel}>
      Discard
    </Button>,
    <Button type="primary" htmlType="submit">
      Save
    </Button>
  ];
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        state: STATE_VALUES.CONNECTED,
        ...initialValues,
      }}
      onFinish={onFinish}
      layout="vertical"
    >
      <Row className='edit-domain-template__wrapper'>
        <Col span={6} className='edit-domain-template__left-box'>
          <Form.Item
            label="Add Media"
            name="imageFiles"
            valuePropName="fileList"
            getValueFromEvent={upload.getValueFromEvent}
          >
            <UploadBox action={action}
                       widthAuto={true}
                       className='edit-domain-template__media-upload-box'
                       onRemove={handleRemoveImage}
                       selectLabel="Upload Image"
                       selectNote="GIF files will not animate."
                       maxFileUpload={1}
            />
          </Form.Item>
        </Col>
        <Col span={18} className='edit-domain-template__right-box'>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter name!',
              },
            ]}
          >
            <InputText placeholder="Domain name"/>
          </Form.Item>
          <Form.Item
            label="Status"
            name="state"
            hidden={true}
          >
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter name!',
              },
            ]}
          >
            <InputText placeholder="Domain name"/>
          </Form.Item>
          <Form.Item
            label="Status"
            name="state"
            hidden={true}
          >
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter name!',
              },
            ]}
          >
            <InputText placeholder="Domain name"/>
          </Form.Item>
          <Form.Item
            label="Status"
            name="state"
            hidden={true}
          >
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter name!',
              },
            ]}
          >
            <InputText placeholder="Domain name"/>
          </Form.Item>
          <Form.Item
            label="Status"
            name="state"
            hidden={true}
          >
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter name!',
              },
            ]}
          >
            <InputText placeholder="Domain name"/>
          </Form.Item>
          <Form.Item
            label="Status"
            name="state"
            hidden={true}
          >
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter name!',
              },
            ]}
          >
            <InputText placeholder="Domain name"/>
          </Form.Item>
          <Form.Item
            label="Status"
            name="state"
            hidden={true}
          >
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter name!',
              },
            ]}
          >
            <InputText placeholder="Domain name"/>
          </Form.Item>
          <Form.Item
            label="Status"
            name="state"
            hidden={true}
          >
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter name!',
              },
            ]}
          >
            <InputText placeholder="Domain name"/>
          </Form.Item>
          <Form.Item
            label="Status"
            name="state"
            hidden={true}
          >
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please enter name!',
              },
            ]}
          >
            <InputText placeholder="Domain name"/>
          </Form.Item>
          <Form.Item
            label="Status"
            name="state"
            hidden={true}
          >
          </Form.Item>
        </Col>
      </Row>
      <div className='edit-domain-template__footer'>
        <ButtonListWrapper buttonList={buttonList}
                           align="right"
                           className="no-margin"
        />
      </div>
    </Form>
  )
}
