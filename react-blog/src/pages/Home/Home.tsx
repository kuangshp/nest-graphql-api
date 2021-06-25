import React from 'react';
import { ArticleCard, PersonCard, GuideCard } from 'src/components';
import { RootState, useSelector } from 'src/redux';
import styles from './home.module.scss';

export const Home: React.FC = () => {
  const username: string | null = useSelector((rootState: RootState) => rootState.user.username);

  return (
    <div className={styles.column}>
      {username ? (
        <>
          <div className={styles.left}>
            <PersonCard />
          </div>
          <div className={styles.middle}>
            <ArticleCard />
          </div>
          <div className={styles.right}>
            <GuideCard />
          </div>
        </>
      ) : (
        <>
          <div className={styles.middle1}>
            <ArticleCard />
          </div>
          <div className={styles.right}>
            <GuideCard />
          </div>
        </>
      )}
    </div>
  );
};
