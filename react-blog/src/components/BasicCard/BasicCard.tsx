import React from 'react';
import styles from './BasicCard.module.scss';

interface Props {
  className?: string;
}

export const BasicCard: React.FC<Props> = ({ children, className }) => {
  return <div className={`${className} ${styles[`cardWrapper`]}`}>{children}</div>;
};
