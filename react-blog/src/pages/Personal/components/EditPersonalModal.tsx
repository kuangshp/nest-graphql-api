import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Form, Input, message, Modal, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { ITable } from '..';
import { UploadChangeParam } from 'antd/lib/upload';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';

type Props = PropsWithChildren<{
  isModalVisible: boolean;
  rowData: ITable | null;
  setIsModalVisible: (isSave?: boolean) => void;
}>;

const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

export const EditPersonalModal: React.FC<Props> = (props: Props) => {
  const { isModalVisible, setIsModalVisible, rowData } = props;
  const [loading, setLoading] = useState<boolean>(false);
  const [key, setKey] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const [form] = Form.useForm();

  useEffect(() => {
    if (rowData) {
      setKey(rowData.key);
      setValue(rowData.label);
    }
  }, [rowData]);
  const handleOk = () => {
    form.validateFields().then((values) => {
      if (rowData?.isImg) {
        console.log({ [key]: value });
      } else {
        console.log({ [key]: values[key] }, '提交值');
      }

      setTimeout(() => {
        setIsModalVisible(true);
        resetValue();
      }, 1000);
    });
  };
  // 取消
  const handleCancel = () => {
    setIsModalVisible();
    resetValue();
  };
  const resetValue = () => {
    setKey('');
    setValue('');
    form.resetFields();
  };
  // 上传前
  const beforeUpload = (file: RcFile): boolean => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  // 上传成功
  const handleChange = (info: UploadChangeParam<UploadFile<string>>): void => {
    console.log(info);

    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log('上传');
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <Modal title="修改资料" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      <Form {...layout} name="personal" form={form}>
        {rowData?.isImg ? (
          <Form.Item name={key}>
            <Upload
              fileList={[{ name: key, uid: 'asd', url: value }]}
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUpload}
              onChange={handleChange}
            >
              {rowData.label ? (
                <img src={rowData.label} alt="avatar" style={{ width: '100%' }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
        ) : (
          <Form.Item
            name={key}
            initialValue={value}
            rules={[{ required: true, message: '请输入' }]}
          >
            <Input placeholder="请输入" />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};
