import React from 'react';
import { Form } from 'antd';
import UploadBox from 'components/Common/UploadBox';
import {
  DESIGN_VALUES,
} from 'components/contants';
import { upload } from 'utils';
import { SellerDesignsService } from 'services';
import Icon from 'components/Common/Icon';
import checkedIcon from 'images/checked-checkbox.svg';

export default function DesignDetailForm({ form, isEdit, designId, initialValues, ...restProps }) {
  const actionMockup = SellerDesignsService.getDesignDetailImageUrl(designId, 'Mockup');
  const actionDesign = SellerDesignsService.getDesignDetailImageUrl(designId, 'Design');
  const handleRemoveImage = (file) => {
    SellerDesignsService.deleteProductImage(designId, file.id);
  }
  return (
    <Form
      name="basic"
      form={form}
      autoComplete="off"
      initialValues={{
        type: DESIGN_VALUES._2D,
        designFileList: upload.getFileListFromList(initialValues && initialValues.convertedDesignImages),
        mockFileList: upload.getFileListFromList(initialValues && initialValues.convertedMockupImages),
        ...initialValues,
      }}
      layout="vertical"
      {...restProps}
    >
      {
        !isEdit && (
          <Form.Item>
            <div className='display-flex display-flex--center-align-items'>
              <Icon src={checkedIcon} width={18} height={18}/>
              <span style={{marginLeft: 8}}>Create design Sku successfully</span>
            </div>
          </Form.Item>
        )
      }
      <Form.Item
        label="Mockup"
        name="mockFileList"
        valuePropName="fileList"
        getValueFromEvent={upload.getValueFromEvent}
      >
        <UploadBox action={actionMockup}
                   selectLabel="Choose file mockup"
                   onRemove={handleRemoveImage}
                   maxFileUpload={1}
        />
      </Form.Item>
      <Form.Item
        label="Design"
        name="designFileList"
        valuePropName="fileList"
        getValueFromEvent={upload.getValueFromEvent}
      >
        <UploadBox action={actionDesign}
                   selectLabel="Choose file design"
                   onRemove={handleRemoveImage}
                   maxFileUpload={3}
        />
      </Form.Item>
    </Form>
  )
}
