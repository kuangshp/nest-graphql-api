import React, { useState, PropsWithChildren, useCallback, ReactElement } from 'react';
import { Input } from 'antd';
import { ActionType, CommentTools } from './CommentTools';
import Avatar from 'antd/lib/avatar/avatar';
import styles from './comment.module.scss';

import { UserOutlined } from '@ant-design/icons';
export interface IComment {
  /**评论ID */
  id: number;
  /**头像 */
  avatar: string;
  /**用户名 */
  username: string;
  /**创建时间 */
  createdAt: string;
  /**评论内容 */
  comment: string;
}

type Props = PropsWithChildren<{
  commentList?: IComment[];
  commentInfo?: IComment;
}>;
export const Reply: React.FC<Props> = (props: Props) => {
  const { commentInfo } = props;
  const [isReply, setReply] = useState(false);
  const [comment, setComment] = useState<IComment[]>([]);
  const toClick = (action: ActionType, commentId: number) => {
    setReply(false);

    // 查看回复
    if (action === 'FolderOpen') {
      const commentList: IComment[] = [];
      for (let i = 0; i < 5; i++) {
        commentList.push({
          id: i,
          avatar: '',
          username: 'xx',
          createdAt: '2021-12-10',
          comment: '简单评论',
        });
      }
      setComment([...comment, ...commentList]);
    }
    // 回复
    if (action === 'RotateRight') {
      console.log(commentId);
      setReply(!isReply);
    }
  };
  const toReply = (val: string) => {
    console.log(val, '回复');
  };

  const genDOMS = useCallback(() => {
    return (
      props.commentList &&
      props.commentList.map((comment) => <Reply key={Math.random()} commentInfo={comment} />)
    );
  }, [props.commentList]);

  if (props.commentList) {
    return genDOMS() as unknown as ReactElement;
  }

  return (
    <div className={styles.commentItem} key={Math.random()}>
      <div>
        <Avatar icon={<UserOutlined />} />
      </div>
      <div className={styles.item}>
        <div className={styles.commentUser}>
          <div className={styles.nickname}>{commentInfo?.username}</div>
          <div className={styles.time}>{commentInfo?.createdAt}</div>
        </div>
        <div>{commentInfo?.comment}</div>
        {/* eslint-disable-next-line */}
        <CommentTools toClick={toClick} commentId={commentInfo!.id} />
        {isReply && (
          <Input.Search
            className={styles.toReply}
            placeholder="回复："
            enterButton="发布"
            onSearch={toReply}
          />
        )}
        {/* 递归组件 */}
        <Reply commentList={comment} />
      </div>
    </div>
  );
};
