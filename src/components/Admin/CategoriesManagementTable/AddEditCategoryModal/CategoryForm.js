import React, { useState } from 'react';
import { Button, Form, InputNumber } from 'antd';
import UploadBox from 'components/Common/UploadBox';
import {
  STATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import { upload } from 'utils';
import InputText from 'components/Common/InputText';
import { AdminCategoriesService } from 'services';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import { getShortPathImage } from 'services/BaseService';

export default function CategoryForm({ form, isEdit, initialValues, onCancel, onFinish, ...restProps }) {
  const action = AdminCategoriesService.getUploadImageUrl();
  const [deletedImages, setDeletedImages] = useState([]);

  const handleRemoveImage = (file) => {
    setDeletedImages([
      ...deletedImages,
      file,
    ])
  }
  const removeUnusedImagesBefore = (successCallback = () => {}, submit = false) => {
    const { imageFiles = [] } = form.getFieldsValue();
    const newUploadedImages = imageFiles.map(imageFile => imageFile.response).filter(image => !image.existing);
    const newUploadedImagesInDeletedImage = deletedImages.filter(image => !image.existing);
    const unusedImages = submit ? deletedImages : [...newUploadedImagesInDeletedImage, ...newUploadedImages];
    if (!unusedImages.length) {
      successCallback();
      return;
    }
    const promiseUnusedImages = unusedImages.map(image => new Promise((resolve, reject) => {
      AdminCategoriesService.deleteImage(getShortPathImage(image.url), resolve, reject);
    }));
    Promise.all(promiseUnusedImages).then(() => {
      setDeletedImages([]);
      successCallback();
    }).catch(error => {
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
      Cancel
    </Button>,
    <Button type="primary" htmlType="submit">
      {isEdit ? "Save" : "Add"}
    </Button>
  ]

  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        state: '',
        imageFiles: upload.getFileListFromList(initialValues ? initialValues.convertedCategoryImages : []),
        ...initialValues,
      }}
      onFinish={(values) => {
        removeUnusedImagesBefore(() => {
          onFinish(values);
        }, true)
      }}
      layout="vertical"
      {...restProps}
    >
      <Form.Item
        label="Category name"
        name="name"
        rules={[
          {
            required: true,
            message: 'Please enter category name!',
          },
        ]}
      >
        <InputText placeholder="Category name"  />
      </Form.Item>
      <Form.Item
        label="Upload"
        name="imageFiles"
        valuePropName="fileList"
        getValueFromEvent={upload.getValueFromEvent}
      >
        <UploadBox action={action}
                   onRemove={handleRemoveImage}
                   selectLabel="Choose category image"
                   maxFileUpload={1}
        />
      </Form.Item>
      <Form.Item
        label="Slug"
        name="slug"
        rules={[
          {
            required: true,
            message: 'Please enter slug!',
          },
        ]}
      >
        <InputText placeholder="Slug" />
      </Form.Item>
      <Form.Item
        label="Display order"
        name="displayOrder"
        rules={[
          {
            required: true,
            message: 'Please enter display order!',
          },
        ]}
      >
        <InputNumber min={0} placeholder="Display order"  />
      </Form.Item>
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
      <div style={{ paddingBottom: 20}}>
        <ButtonListWrapper buttonList={buttonList}
                           align="right"
        />
      </div>
    </Form>
  )
}
