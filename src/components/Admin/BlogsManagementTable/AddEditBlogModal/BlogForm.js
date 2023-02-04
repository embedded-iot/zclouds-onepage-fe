import React, { useState } from 'react';
import { Button, Form } from 'antd';
import UploadBox from 'components/Common/UploadBox';
import {
  STATE_LABEL_VALUE_OPTIONS,
} from 'components/contants';
import DropdownSelect from 'components/Common/DropdownSelect';
import { upload } from 'utils';
import InputText from 'components/Common/InputText';
import { AdminBlogsService } from 'services';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import { getShortPathImage } from 'services/BaseService';
import InputNumber from 'components/Common/InputNumber';
import TextEditor from 'components/Common/TextEditor';

export default function BlogForm({ form, isEdit, initialValues, onCancel, onFinish, ...restProps }) {
  const action = AdminBlogsService.getUploadImageUrl();
  const [deletedImages, setDeletedImages] = useState([]);

  const handleRemoveImage = (file) => {
    setDeletedImages([
      ...deletedImages,
      file,
    ])
  }
  const removeUnusedImagesBefore = (successCallback = () => {}, submit = false) => {
    const { imageFiles = [] } = form.getFieldsValue();
    const newUploadedImages = imageFiles.map(imageFile => imageFile.response).filter(image =>  image && !image.existing);
    const newUploadedImagesInDeletedImage = deletedImages.filter(image => image && !image.existing);
    const unusedImages = submit ? deletedImages : [...newUploadedImagesInDeletedImage, ...newUploadedImages];
    if (!unusedImages.length) {
      successCallback();
      return;
    }
    const promiseUnusedImages = unusedImages.map(image => new Promise((resolve, reject) => {
      AdminBlogsService.deleteImage(getShortPathImage(image.url), resolve, reject);
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
        imageFiles: upload.getFileListFromList(initialValues ? initialValues.convertedBlogImages : []),
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
        label="Image"
        name="imageFiles"
        valuePropName="fileList"
        getValueFromEvent={upload.getValueFromEvent}
      >
        <UploadBox action={action}
                   onRemove={handleRemoveImage}
                   selectLabel="Choose blog image"
                   maxFileUpload={1}
        />
      </Form.Item>
      <Form.Item
        label="Category"
        name="category"
        rules={[
          {
            required: true,
            message: 'Please enter category!',
          },
        ]}
      >
        <InputText placeholder="Category"  />
      </Form.Item>
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
        <InputText placeholder="Title"  />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please enter description!',
          },
        ]}
      >
        <InputText placeholder="Description"  />
      </Form.Item>
      <Form.Item
        label="Content"
        name="content"
        rules={[
          {
            required: true,
            message: 'Please enter content!',
          },
        ]}
      >
        <TextEditor />
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
