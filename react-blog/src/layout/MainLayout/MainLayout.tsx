import React from 'react';
import { MainHeader } from '../MainHeader';
import styles from './MainLayout.module.scss';

export const MainLayout: React.FC = ({ children }) => {
  return (
    <div className={styles.layout}>
      <MainHeader />
      <div className={styles.container}>{children}</div>
    </div>
  );
};
