import React from 'react';
import styles from './PersonCard.module.scss';
import { BasicCard } from '../BasicCard';
import AVATOR from 'src/assets/images/avatar.png';
import { EnvironmentOutlined } from '@ant-design/icons';
export const PersonCard: React.FC = () => {
  return (
    <BasicCard>
      <div className={styles.personCard}>
        <div className={styles.infos}>
          <div className={styles.avatar}>
            <img src={AVATOR} alt="" />
          </div>
          <div className={styles.nickname}>大漠殇秋</div>
          <div className={styles.job}>前端架构师</div>
          <div className={styles.addr}>
            <EnvironmentOutlined />
            北京市
          </div>
        </div>

        <div className={styles.tags}>
          <div>
            <span>文章</span>
            <span>41</span>
          </div>
          <div>
            <span>点赞</span>
            <span>162</span>
          </div>
          <div>
            <span>订阅</span>
            <span>87</span>
          </div>
        </div>

        <div className={styles.action}>
          <div>关注+</div>
        </div>
      </div>
    </BasicCard>
  );
};
