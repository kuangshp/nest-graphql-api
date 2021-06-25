import React, { useState } from 'react';
import styles from './comment.module.scss';
import { IComment, Reply } from './Reply';
import { CaretDownOutlined } from '@ant-design/icons';

export const CommentList: React.FC = () => {
  const [comment, setComment] = useState<IComment[]>([
    {
      id: 1,
      avatar: '',
      username: 'xx',
      createdAt: '2021-12-10',
      comment: '简单评论',
    },
  ]);
  const takeMore = () => {
    console.log('查看更多');
    const commentList: IComment[] = [];
    for (let i = 10; i < 15; i++) {
      commentList.push({
        id: i,
        avatar: '',
        username: 'xx',
        createdAt: '2021-12-10',
        comment: '简单评论',
      });
    }
    setComment([...comment, ...commentList]);
  };
  return (
    <div className={styles.commentList}>
      <div className={styles.top}>42&nbsp;条评论</div>
      <Reply commentList={comment} />
      {/* {comment} */}
      <div className={styles.more} onClick={takeMore}>
        查看更多回复
        <CaretDownOutlined />
      </div>
    </div>
  );
};
