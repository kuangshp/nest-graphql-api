import React, { PropsWithChildren, useEffect } from 'react';
import { Modal, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useMutation, gql } from '@apollo/client';
import styles from './RegisterModal.module.scss';
const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

type Props = PropsWithChildren<{
  isModifyVisible: boolean;
  setIsModifyVisible: (isShow: boolean) => void;
}>;

const registerGql = gql`
  mutation registerUser($username: String!, $password: String!, $confirmPassword: String!) {
    register(data: { username: $username, password: $password, confirmPassword: $confirmPassword })
  }
`;
export const RegisterModal: React.FC<Props> = (props: Props) => {
  const { isModifyVisible, setIsModifyVisible } = props;
  const [registerApi, { loading, error, data }] = useMutation(registerGql);
  const [form] = Form.useForm();
  const handleModifyOk = () => {
    form.validateFields().then((values) => {
      console.log(values);
      registerApi({
        variables: values,
      }).catch((e: Error) => {
        console.log(e.message, '===');
      });
    });
  };
  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);
  useEffect(() => {
    console.log(data);
    if (data) {
      message.success('注册成功');
      handleModifyCancel();
    }
    // eslint-disable-next-line
  }, [data]);
  // 取消按钮
  const handleModifyCancel = () => {
    setIsModifyVisible(false);
    form.resetFields();
  };
  return (
    <Modal
      visible={isModifyVisible}
      onCancel={handleModifyCancel}
      className={styles.loginModal}
      footer={null}
      closable={false}
      width={400}
    >
      <Form form={form} {...layout} className={styles.inputs}>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>
          博客注册
        </Typography.Title>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: '请输入用户名/手机号码',
            },
          ]}
        >
          <Input placeholder="请输入用户名/手机号码" prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: '请输入密码',
            },
          ]}
        >
          <Input.Password placeholder="请输入密码" prefix={<LockOutlined />} />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          hasFeedback
          rules={[
            {
              required: true,
              message: '请再次输入密码',
            },
            ({ getFieldValue }) => ({
              validator(_, value: string) {
                console.log(getFieldValue('password'), value, '==>>');
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('密码确认不一致！');
              },
            }),
          ]}
        >
          <Input.Password placeholder="请再次输入密码" prefix={<LockOutlined />} />
        </Form.Item>
        <Button type="primary" className={styles.login} loading={loading} onClick={handleModifyOk}>
          注册
        </Button>
      </Form>
    </Modal>
  );
};
