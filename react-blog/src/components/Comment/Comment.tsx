import React from 'react';
import styles from './comment.module.scss';
import { CommentList } from './components';

export const Comment: React.FC = () => {
  return (
    <div className={styles.commentContainer}>
      <div className={styles.title}>评论区</div>

      <div className={styles.comment}>
        <CommentList />
      </div>
    </div>
  );
};
