import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'antd';
import InputText from 'components/Common/InputText';
import {
  DOMAIN_TEMPLATE_LABEL_VALUE_OPTIONS, HAVE_MENU_LABEL_VALUE_OPTIONS,
  POLICIES_VERSIONS_LABEL_VALUE_OPTIONS,
  RESPONSIVE_MEDIAS,
} from 'components/contants';
import ButtonListWrapper from 'components/Common/ButtonListWrapper';
import { upload } from 'utils';
import UploadBox from 'components/Common/UploadBox';
import { AdminProductsService } from 'services';
import SwitchButton from 'components/Common/SwitchButton';
import RadioSelect from 'components/Common/RadioSelect';
import TabsBox from 'components/Common/TabsBox';
import TextEditor from 'components/Common/TextEditor';
import AuthenticateDomainBox from 'components/Seller/DomainsTable/EditDomainTemplateBox/AuthenticateDomainBox';
import InputNumber from 'components/Common/InputNumber';
import { useMediaQuery } from 'react-responsive';
import ColorPickerBox from 'components/Common/ColorPickerBox';
import announcementBarIcon from 'images/bell_light_icon.svg';
import addressIcon from 'images/pin_light_icon.svg';
import phoneIcon from 'images/phone_light_icon.svg';
import emailIcon from 'images/message_light_icon.svg';
import facebookIcon from 'images/facebook_light_icon.svg';
import instagramIcon from 'images/instagram_light_icon.svg';
import twitterIcon from 'images/twitter_light_icon.svg';


import Icon from 'components/Common/Icon';


export default function DomainTemplateForm({ form, initialValues, onFinish, onCancel }) {
  const isMobile = useMediaQuery(RESPONSIVE_MEDIAS.MOBILE);
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

  const items = [
    {
      label: 'Top description',
      key: 'TOP_DESCRIPTION',
      name: 'topDescription',
    },
    {
      label: 'Middle description',
      key: 'MIDDLE_DESCRIPTION',
      name: 'middleDescription',
    },
    {
      label: 'Bottom description',
      key: 'BOTTOM_DESCRIPTION',
      name: 'bottomDescription',
    }
  ]

  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        template: 'default',
        configs: 'default',
        logoWidth: 120,
        primaryColor: '#8270DBFF',
        textColor: '#CC519DFF',
        secondaryColor: '#B7B4B2FF',
        backgroundColor: '#FAFAFAFF',
        ...initialValues,
      }}
      onValuesChange={(values) => console.log(values)}
      onFinish={onFinish}
      layout="vertical"
    >
      <Row className='page-content-box__contents'>
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
            label="Advanced Settings"
            name="advancedSettings"
          >
            <SwitchButton prevLabel={<span className='edit-domain-template__advanced-settings-switch'>Using random sellpage</span>}
                          showLabel={true}
            />
          </Form.Item>
          <Form.Item
            label="Template"
            name="template"
          >
            <RadioSelect
              options={DOMAIN_TEMPLATE_LABEL_VALUE_OPTIONS}
            />
          </Form.Item>
          <Form.Item>
            <TabsBox type="card" items={items.map(item => ({
              ...item,
              children: (
                <Form.Item
                  name={item.name}
                >
                  <TextEditor />
                </Form.Item>
              )
            }))} />
          </Form.Item>
          <Form.Item>
            <AuthenticateDomainBox />
          </Form.Item>
          <Form.Item
            label={(
              <div>
                <div>Configures</div>
                <div style={{fontWeight: 'normal'}}>Versions policy</div>
              </div>
            )}
            name="configs"
          >
            <RadioSelect
              options={POLICIES_VERSIONS_LABEL_VALUE_OPTIONS}
            />
          </Form.Item>

          <Row gutter={isMobile ? [8, 16] : [64, 0]}>
            <Col span={8}>
              <Form.Item
                label="Store Name"
                name="storeName"
              >
                <InputText placeholder="Store Name"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Store Title"
                name="storeTitle"
              >
                <InputText placeholder="Store Title"/>
              </Form.Item>
            </Col>
            <Col span={8}>

            </Col>
          </Row>
          <Row gutter={isMobile ? [8, 16] : [64, 0]}>
            <Col span={8}>
              <Form.Item
                label="Favicon"
                name="imageFiles"
                valuePropName="fileList"
                getValueFromEvent={upload.getValueFromEvent}
              >
                <UploadBox action={action}
                           widthAuto={true}
                           onRemove={handleRemoveImage}
                           selectLabel="Upload Image"
                           selectNote="48 x 48 px"
                           maxFileUpload={1}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Logo"
                name="imageFiles"
                valuePropName="fileList"
                getValueFromEvent={upload.getValueFromEvent}
              >
                <UploadBox action={action}
                           widthAuto={true}
                           onRemove={handleRemoveImage}
                           selectLabel="Upload Image"
                           selectNote="48 x 48 px"
                           maxFileUpload={1}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Logo width (px)"
                name="logoWidth"
              >
                <InputNumber min={0} placeholder="..."  />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={isMobile ? [8, 16] : [64, 0]}>
            <Col span={8}>
              <Form.Item
                label="Color"
                name="primaryColor"
              >
                <ColorPickerBox label="Primary Color" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="  "
                name="textColor"
              >
                <ColorPickerBox label="Text Color" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={isMobile ? [8, 16] : [64, 0]}>
            <Col span={8}>
              <Form.Item
                label="  "
                name="secondaryColor"
              >
                <ColorPickerBox label="Secondary Color" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="  "
                name="backgroundColor"
              >
                <ColorPickerBox label="Background Color" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={isMobile ? [8, 16] : [64, 0]}>
            <Col span={8}>
              <Form.Item
                label={(
                  <>
                    <Icon src={announcementBarIcon} width={24} height={24} />
                    <span>Announcement Bar</span>
                  </>
                )}
                name="announcementBarIcon"
              >
                <InputText placeholder="Announcement Bar"/>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Have menu"
            name="haveMenu"
          >
            <RadioSelect
              options={HAVE_MENU_LABEL_VALUE_OPTIONS}
            />
          </Form.Item>
          <Row gutter={isMobile ? [8, 16] : [64, 0]}>
            <Col span={8}>
              <Form.Item
                label={(
                  <>
                    <Icon src={addressIcon} width={24} height={24} />
                    <span>Address</span>
                  </>
                )}
                name="address"
              >
                <InputText placeholder="Address"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={(
                  <>
                    <Icon src={phoneIcon} width={24} height={24} />
                    <span>Phone</span>
                  </>
                )}
                name="phone"
              >
                <InputText placeholder="Phone"/>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={(
                  <>
                    <Icon src={emailIcon} width={24} height={24} />
                    <span>Email Support</span>
                  </>
                )}
                name="emailSupport"
              >
                <InputText placeholder="Email Support"/>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Google Analytic ID"
            name="googleAnalyticID"
            className="no-margin"
          >
            <InputText placeholder="Google Analytic ID"/>
          </Form.Item>
          <Form.Item>
            Separate with commas (,) to add multiple GA id
          </Form.Item>
          <Form.Item>
            <Row gutter={isMobile ? [8, 16] : [64, 0]}>
              <Col span={8}>
                <Form.Item
                  label={(
                    <>
                      <Icon src={facebookIcon} width={24} height={24} />
                      <span>Facebook URL</span>
                    </>
                  )}
                  name="facebookURL"
                  rules={[
                    {
                      type: 'url',
                      message: 'Url invalid!',
                    },
                  ]}
                >
                  <InputText placeholder="Facebook URL"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={(
                    <>
                      <Icon src={instagramIcon} width={24} height={24} />
                      <span>Instagram</span>
                    </>
                  )}
                  name="instagram"
                  rules={[
                    {
                      type: 'url',
                      message: 'Url invalid!',
                    },
                  ]}
                >
                  <InputText placeholder="Instagram"/>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label={(
                    <>
                      <Icon src={twitterIcon} width={24} height={24} />
                      <span>Twitter</span>
                    </>
                  )}
                  name="twitter"
                  rules={[
                    {
                      type: 'url',
                      message: 'Url invalid!',
                    },
                  ]}
                >
                  <InputText placeholder="Twitter"/>
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
        </Col>
      </Row>
      <div className='page-content-box__footer'>
        <ButtonListWrapper buttonList={buttonList}
                           align="right"
                           className="no-margin"
        />
      </div>
    </Form>
  )
}
