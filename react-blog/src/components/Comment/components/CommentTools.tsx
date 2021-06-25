import React from 'react';
import { RotateRightOutlined, MessageOutlined, FolderOpenOutlined } from '@ant-design/icons';
import styles from './comment.module.scss';
export type ActionType = 'RotateRight' | 'Message' | 'FolderOpen';
interface CProps {
  commentId: number;
  count?: number;
  starCls?: string;
  toClick?: (action: ActionType, commentId: number) => void;
}
const SvgOutlined = {
  RotateRightOutlined,
  MessageOutlined,
  FolderOpenOutlined,
};
const store = {
  RotateRight: '回复',
  Message: '条评论',
  FolderOpen: '查看回复',
};
const shadows = {
  RotateRight: 'RotateRight', // 回复
  Message: 'Message', // 多少评论
  FolderOpen: 'FolderOpen', // 全部回复
};

enum ShadowEnum {
  RotateRight,
  Message,
  FolderOpen,
}
console.log(ShadowEnum);

export const CommentTools: React.FC<CProps> = ({ count = 0, toClick, commentId }) => {
  const commentToolsTypes = Object.keys(store);
  const handleClick = (action: ActionType) => {
    console.log(action, '==');
    toClick && toClick(action, commentId);
  };
  return (
    <div className={styles.tools}>
      {commentToolsTypes.map((c) => {
        const SvgComp = () => React.createElement(SvgOutlined[`${c}Outlined`], {});
        const action = shadows[c];
        return (
          <span key={c} onClick={() => handleClick(action)} style={{ margin: '0 5px' }}>
            <SvgComp />
            <span>
              {c === 'Message' ? count : ''}
              {store[c]}
            </span>
          </span>
        );
      })}
    </div>
  );
};
