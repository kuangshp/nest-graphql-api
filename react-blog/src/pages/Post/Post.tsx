import React, { useState, useEffect } from 'react';
import { Form, Input, Button, message, Select } from 'antd';
import { FormEditor, BasicCard, Loading } from 'src/components';
import { useHistory } from 'react-router-dom';
import styles from './post.module.scss';
import { useMutation, gql, useQuery } from '@apollo/client';

// 上传文件的gql
const fileUploadGql = gql`
  mutation FileUpload($file: Upload!) {
    fileUpload(file: $file)
  }
`;

// 文章分类的gql
const categoryGql = gql`
  query CategoryList {
    categoryList {
      id
      name
    }
  }
`;

// 上传文件的gql
const createPostGql = gql`
  mutation CreatePost1($title: String!, $categoryId: Float!, $imgUrl: String!, $content: String!) {
    createPost(data: { title: $title, categoryId: $categoryId, imgUrl: $imgUrl, content: $content })
  }
`;

interface ICategory {
  id: number;
  name: string;
}
export const Post: React.FC = () => {
  const [isShowFile, setIsShowFile] = useState<boolean>(true);
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);
  const [imgUrl, setImgUrl] = useState<string>('');
  // const [content, setContent] = useState<string>('');
  const [form] = Form.useForm();
  const [uploadFileApi, { data: uploadResult, error: uploadError }] = useMutation(fileUploadGql);
  const [
    createPostApi,
    { data: createPostResult, loading: createPostLoading, error: createPostError },
  ] = useMutation(createPostGql);
  const { data: categoryResult } = useQuery(categoryGql);
  const history = useHistory();
  useEffect(() => {
    if (uploadError) {
      message.error(uploadError.message);
    }
  }, [uploadError]);
  useEffect(() => {
    if (uploadResult) {
      setImgUrl(uploadResult.fileUpload);
      form.setFieldsValue({ imgUrl: uploadResult.fileUpload });
    }
    // eslint-disable-next-line
  }, [uploadResult]);
  useEffect(() => {
    if (categoryResult) {
      setCategoryList(categoryResult.categoryList);
    }
  }, [categoryResult]);
  useEffect(() => {
    if (createPostError) {
      message.error(createPostError.message);
    }
  }, [createPostError]);
  useEffect(() => {
    if (createPostResult) {
      message.success(createPostResult.createPost);
      history.push('/home');
    }
    // eslint-disable-next-line
  }, [createPostResult]);
  // 上传文件
  const uploadHandler = () => {
    const fileNode: HTMLElement = document.getElementById('file') as HTMLElement;
    fileNode.click();
    fileNode.addEventListener<'change'>(
      'change',
      function ({
        target: {
          validity,
          files: [file],
        },
      }: // eslint-disable-next-line
      any) {
        setIsShowFile(false);
        validity.valid && uploadFileApi({ variables: { file } });
        setTimeout(() => {
          setIsShowFile(true);
        });
      }
    );
  };
  // 发布文章
  const pushPostHandler = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values, '文件内容');
        createPostApi({
          variables: values,
        }).catch((e: Error) => console.log(e));
      })
      .catch((e: Error) => {
        console.log(e);
        message.error('请填写数据');
      });
  };
  return (
    <>
      {createPostLoading && <Loading />}
      <BasicCard className={styles.post}>
        <Form form={form} layout="vertical" className={styles.form}>
          <Form.Item
            name="title"
            label="标题"
            rules={[
              {
                required: true,
                message: '请输入文章标题',
              },
            ]}
          >
            <Input placeholder="请输入标题" />
          </Form.Item>
          <Form.Item
            label="分类"
            name="categoryId"
            rules={[
              {
                required: true,
                message: '请选择文章分类',
              },
            ]}
          >
            <Select>
              {categoryList.map((item: ICategory) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="imgUrl"
            label="封面"
            rules={[
              {
                required: true,
                message: '请上传封面图',
              },
            ]}
          >
            <Input type="hidden" />
            {isShowFile && <input type="file" id="file" style={{ display: 'none' }} />}
            {imgUrl && (
              <img src={imgUrl} alt="" style={{ width: 100, height: 100, marginBottom: 10 }} />
            )}
            <div>
              <Button type="primary" onClick={uploadHandler}>
                上传封面图
              </Button>
            </div>
          </Form.Item>
          <Form.Item
            name="content"
            label="文章内容"
            rules={[
              {
                required: true,
                message: '请添加文章内容',
              },
            ]}
          >
            <FormEditor />
          </Form.Item>
          <Button type="primary" style={{ float: 'right' }} onClick={pushPostHandler}>
            发布文章
          </Button>
        </Form>
      </BasicCard>
    </>
  );
};
