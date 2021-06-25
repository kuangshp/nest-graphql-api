import React, { PropsWithChildren, useEffect } from 'react';
import { Modal, Form, Input, Button, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import styles from './LoginModal.module.scss';
import { userSlice } from 'src/redux/slice/userSlice';
import { useLazyQuery, gql } from '@apollo/client';
const layout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

type Props = PropsWithChildren<{
  isModifyVisible: boolean;
  setIsModifyVisible: (isShow: boolean) => void;
}>;

// 定义登录的gql
const LoginGql = gql`
  query Login($username: String!, $password: String!) {
    # 定义查询方法(浏览器上显示的)
    login(data: { username: $username, password: $password }) {
      id
      username
      token
    }
  }
`;
export const LoginModal: React.FC<Props> = (props: Props) => {
  const { isModifyVisible, setIsModifyVisible } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [loginApi, { loading, data: loginResult, error }] = useLazyQuery(LoginGql);
  const loginHandle = () => {
    console.log('点击了确定');
    form.validateFields(['username', 'password']).then((values) => {
      const { username, password } = values;
      console.log(username, password, '登录信息');
      loginApi({ variables: { username, password } });
    });
  };
  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);
  useEffect(() => {
    if (loginResult) {
      console.log(loginResult);
      const { id, username, token } = loginResult.login;
      dispatch(userSlice.actions.mockLogin({ username, token, userId: id }));
      setTimeout(() => {
        setIsModifyVisible(false);
      }, 500);
    }
    // eslint-disable-next-line
  }, [loginResult]);
  const handleModifyCancel = () => {
    setIsModifyVisible(false);
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
          博客登录
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
        <Button type="primary" className={styles.login} onClick={loginHandle} loading={loading}>
          登陆
        </Button>
      </Form>
    </Modal>
  );
};
