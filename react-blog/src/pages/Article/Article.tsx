import React, { useState, useEffect } from 'react';
import styles from './article.module.scss';
import { BasicCard, Comment, GuideCard } from 'src/components';
import { StarOutlined, LikeOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useQuery, gql, useMutation } from '@apollo/client';
import { useSelector, RootState } from 'src/redux';
import { Loading } from 'src/components/Loading/Loading';
import { formatDate } from 'src/utils/date';
import { message } from 'antd';

interface IPostDetail {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  imgUrl: string;
  content: string;
  categoryId: number;
  categoryName: string;
  lookCount: number;
  likeCount: number;
  collectCount: number;
  userName: string;
  isLike: number;
  isCollect: number;
}
// 查询文章的gql
const postDetailGql = gql`
  query postDetail1($postId: Float!, $userId: Float) {
    postDetail(data: { postId: $postId, userId: $userId }) {
      id
      createdAt
      updatedAt
      title
      imgUrl
      content
      categoryId
      categoryName
      lookCount
      likeCount
      collectCount
      userName
      isLike
      isCollect
    }
  }
`;

// 点赞操作
const postLikeGql = gql`
  mutation postLike1($postId: Float!) {
    postLike(data: { postId: $postId })
  }
`;
export const Article: React.FC = () => {
  const userId: number | null = useSelector((rootState: RootState) => rootState.user.userId);
  const [postDetail, setPostDetail] = useState<IPostDetail | null>(null);

  const urlParams = useParams<{ id: string | undefined }>();
  const { data, loading, refetch } = useQuery(postDetailGql, {
    variables: { userId: Number(userId), postId: Number(urlParams.id) },
  });
  const [postLikeApi] = useMutation(postLikeGql);
  console.log(data, loading);
  useEffect(() => {
    if (data) {
      const {
        id,
        createdAt,
        updatedAt,
        title,
        imgUrl,
        content,
        categoryId,
        categoryName,
        lookCount,
        likeCount,
        collectCount,
        userName,
        isLike,
        isCollect,
      } = data.postDetail;
      setPostDetail({
        id,
        createdAt,
        updatedAt,
        title,
        imgUrl,
        content,
        categoryId,
        categoryName,
        lookCount,
        likeCount,
        collectCount,
        userName,
        isLike,
        isCollect,
      });
    }
  }, [data]);

  const startHandler = async () => {
    try {
      const {
        data: { postLike },
      } = await postLikeApi({ variables: { postId: Number(urlParams.id) } });
      message.success(postLike);
      refetch();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      {loading && <Loading />}
      {postDetail && (
        <div className={styles.article}>
          <BasicCard className={styles.details}>
            <div className={styles.title}>{postDetail.title}</div>
            <div className={styles.tags}>
              <span>{postDetail.userName}</span>
              <span>{formatDate(postDetail.createdAt)}</span>
            </div>
            <div
              className={styles.content}
              dangerouslySetInnerHTML={{
                __html: postDetail.content,
              }}
            ></div>
            <div className={styles.recommend}>
              <div className={styles.container}>
                {/* eslint-disable-next-line */}
                <div className={styles.star} onClick={startHandler}>
                  <div>
                    <LikeOutlined />
                    &nbsp;赞
                  </div>
                  <div className={styles.count}>{postDetail.likeCount}</div>
                </div>
                {/* eslint-disable-next-line */}
                <div className={styles.collage}>
                  <div>
                    <StarOutlined />
                    &nbsp;收藏
                  </div>
                  <div className={styles.count}>{postDetail.collectCount}</div>
                </div>
              </div>
            </div>
            <Comment />
          </BasicCard>
          <GuideCard className={styles.other} />
        </div>
      )}
    </>
  );
};
