import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LOGO from 'src/assets/images/logo.svg';
import styles from './MainHeader.module.scss';
import { LoginModal, RegisterModal } from './components';
import { Dropdown, Menu, Typography } from 'antd';
import { RootState, useSelector } from 'src/redux';
import { DownOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { userSlice } from 'src/redux/slice/userSlice';

export const MainHeader: React.FC = () => {
  const [isModifyVisible, setIsModifyVisible] = useState<boolean>(false);
  const [isRegisterModifyVisible, setIsRegisterModifyVisible] = useState<boolean>(false);
  const username: string | null = useSelector((rootState: RootState) => rootState.user.username);
  const dispatch = useDispatch();
  const history = useHistory();
  // 退出登录
  const logoutHandler = () => {
    dispatch(userSlice.actions.logout());
  };
  const menu = (
    <Menu>
      <Menu.Item key="person" onClick={() => history.push('/personal')}>
        个人中心
      </Menu.Item>
      <Menu.Item key="logout" onClick={logoutHandler}>
        退出
      </Menu.Item>
    </Menu>
  );
  return (
    <nav className={styles.navbar}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <Link to="/">
            <img className={styles.logo} src={LOGO} alt="" />
          </Link>
        </div>
        <div className={styles.menus}>
          <div className={styles.items}>{username && <Link to="/post">写文章</Link>}</div>
          <div className={styles.user}>
            {username ? (
              <>
                <Dropdown overlay={menu}>
                  <Typography.Text>
                    {username}&nbsp;
                    <DownOutlined />
                  </Typography.Text>
                </Dropdown>
              </>
            ) : (
              <>
                <Typography.Link onClick={() => setIsModifyVisible(!isModifyVisible)}>
                  登陆
                </Typography.Link>
                <Typography.Link onClick={() => setIsRegisterModifyVisible(!isModifyVisible)}>
                  注册
                </Typography.Link>
              </>
            )}
          </div>
        </div>
      </div>
      <LoginModal isModifyVisible={isModifyVisible} setIsModifyVisible={setIsModifyVisible} />
      <RegisterModal
        isModifyVisible={isRegisterModifyVisible}
        setIsModifyVisible={setIsRegisterModifyVisible}
      />
    </nav>
  );
};
