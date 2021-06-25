import React from 'react';
import { Link } from 'react-router-dom';
import styles from './GuideCard.module.scss';
import { BasicCard } from '../BasicCard';
import DEMO1PIC from 'src/assets/images/demo1.svg';

interface Props {
  className?: string;
}
export const GuideCard: React.FC<Props> = ({ className }) => {
  return (
    <BasicCard className={className}>
      <div className={styles.guideCard}>
        <div className={styles.nav}>最新发布</div>
        <div className={styles.items}>
          <Link to={`/article/1`} className={styles.item}>
            <div className={styles.adPic}>
              <img src={DEMO1PIC} alt="" />
            </div>
            <div className={styles.content}>
              <div className={styles.title}>Redux状态管理原理</div>
              <div className={styles.desc}>
                如果你想在深入学习 Vue
                之前对它有更多了解，我们制作了一个视频，带您了解其核心概念和一个示例工程
              </div>
              <div className={styles.time}>2020-02-12</div>
            </div>
          </Link>
        </div>
      </div>
    </BasicCard>
  );
};
