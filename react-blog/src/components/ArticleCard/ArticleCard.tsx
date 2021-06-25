import React, { useState, useEffect } from 'react';
import { BasicCard, Loading } from 'src/components';
import styles from './ArticleCard.module.scss';
import { Link } from 'react-router-dom';
import { message, Pagination } from 'antd';

import { useLazyQuery, gql } from '@apollo/client';
import { RootState, useSelector } from 'src/redux';

interface IArticle {
  /**文章ID */
  id: number;
  /**文章标题 */
  title: string;
  /**文章小图标 */
  imgUrl: string;
}
// 文章列表
const postListGql = gql`
  query PostList($pageSize: Float, $pageNumber: Float, $userId: Float) {
    postsList(data: { pageSize: $pageSize, pageNumber: $pageNumber, userId: $userId }) {
      data {
        id
        title
        imgUrl
      }
      total
    }
  }
`;

export const ArticleCard: React.FC = () => {
  const [articleList, setArticleList] = useState<IArticle[]>([]);
  const [total, setTotal] = useState<number>(0);
  const userId: number | null = useSelector((rootState: RootState) => rootState.user.userId);
  const [postListApi, { loading, error, data: postResult }] = useLazyQuery(postListGql);

  useEffect(() => {
    if (error) {
      message.error(error.message);
    }
  }, [error]);
  useEffect(() => {
    postListApi({ variables: { pageSize: 10, pageNumber: 1, userId: Number(userId) } });
    // eslint-disable-next-line
  }, [userId]);

  useEffect(() => {
    if (postResult) {
      const { data, total } = postResult.postsList;
      setArticleList(data);
      setTotal(total);
    }
  }, [postResult]);
  return (
    <BasicCard>
      {loading && <Loading />}
      {articleList.map((item: IArticle) => {
        return (
          <Link to={`/article/${item.id}`} key={item.id} className={styles.item}>
            <img src={item.imgUrl} alt="" className={styles.img} />
            <div className={styles.title}>{item.title}</div>
          </Link>
        );
      })}

      <div className={styles.pages}>
        {total > 10 && <Pagination defaultCurrent={1} total={total} />}
      </div>
    </BasicCard>
  );
};
