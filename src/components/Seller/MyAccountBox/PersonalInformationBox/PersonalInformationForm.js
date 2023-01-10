import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Row } from 'antd';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import Icon from 'components/Common/Icon';
import InputText from 'components/Common/InputText';
import userIcon from 'images/user_black_icon.svg';
import { upload } from 'utils';
import UploadBox from 'components/Common/UploadBox';
import { UserService } from 'services';
import { getShortPathImage } from 'services/BaseService';

export default function PersonalInformationForm({ onFinish, initialValues }) {
  const [form] = Form.useForm();
  const action = UserService.getUploadImageUrl();
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
      UserService.deleteImage(getShortPathImage(image.url), resolve, reject);
    }));
    Promise.all(promiseUnusedImages).then(() => {
      setDeletedImages([]);
      successCallback();
    }).catch(error => {
      successCallback();
    })
  }

  const buttonList = [
    <Button type="primary" htmlType="submit">
      Save
    </Button>
  ]

  useEffect(() => {
    return async () => {
      await new Promise((resolve, reject) => {
        removeUnusedImagesBefore(resolve);
      })
    }
    // eslint-disable-next-line
  }, [])
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      layout="vertical"
      initialValues={{
        imageFiles: upload.getFileListFromList(initialValues ? initialValues.convertedAvatarImages : []),
        ...initialValues,
      }}
      onFinish={(values) => {
        removeUnusedImagesBefore(() => {
          onFinish(values);
        }, true)
      }}
    >
      <Card title={<div className="my-account__card-title"><Icon src={userIcon} width={24} height={24} /><span>Personal Information</span></div>}
            className="my-account__card"
            bordered={false}>
        <Row>
          <Col span={16}>
            <Form.Item
              label="Full Name"
              name="fullName"
            >
              <InputText placeholder="Full Name"  />
            </Form.Item>
            <Form.Item
              label="User Name"
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please enter user name!',
                },
              ]}
            >
              <InputText disabled placeholder="User Name"  />
            </Form.Item>
          </Col>
          <Col span={8} className="display-flex display-flex--center-align-items display-flex--center-justify-content">
            <Form.Item
              noStyle={true}
              name="imageFiles"
              valuePropName="fileList"
              getValueFromEvent={upload.getValueFromEvent}
            >
              <UploadBox action={action}
                         onRemove={handleRemoveImage}
                         selectLabel="Choose avatar image"
                         maxFileUpload={1}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Telegram ID"
          name="telegramId"
        >
          <InputText placeholder="Telegram ID"/>
        </Form.Item>
        <Form.Item
          label="Email Address"
          name="email"
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
          <InputText placeholder="Email"/>
        </Form.Item>
        <Form.Item
          label="Phone Contact"
          name="phone"
          rules={[
            {
              required: true,
              message: 'Please enter phone!',
            },
          ]}
        >
          <InputText placeholder="Phone" />
        </Form.Item>
      </Card>
      <ButtonListWrapper buttonList={buttonList}
                         align="right"
      />
    </Form>
  )
}
