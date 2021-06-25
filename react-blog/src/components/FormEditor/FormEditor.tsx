import React, { useEffect, useState } from 'react';
import Editor from 'wangeditor';
import { useInitEffect } from 'src/hooks';
import { useMutation, gql } from '@apollo/client';
import { message } from 'antd';
import { Loading } from '../Loading';

const menus = [
  'head',
  'bold',
  'fontSize',
  'fontName',
  'italic',
  'underline',
  'strikeThrough',
  'indent',
  'lineHeight',
  'foreColor',
  'backColor',
  'link',
  'list',
  'justify',
  'quote',
  'emoticon',
  'image',
  'video',
  'table',
  'code',
  'splitLine',
  'undo',
  'redo',
];

let editor: Editor;

interface Props {
  // eslint-disable-next-line
  value?: any;
  // eslint-disable-next-line
  onChange?: (args: any) => void;
  // eslint-disable-next-line
  id?: any;
}

// 上传文件的gql
const fileUploadGql = gql`
  mutation FileUpload($file: Upload!) {
    fileUpload(file: $file)
  }
`;
export const FormEditor: React.FC<Props> = React.memo(({ value, onChange, id }) => {
  const [uploadFileApi] = useMutation(fileUploadGql);
  const [loading, setLoading] = useState<boolean>(false);
  const eRef = React.useRef();
  const editorCache = React.useRef({});
  const run = (val: string) => onChange && onChange(val);

  useEffect(() => {
    if (!editorCache.current[id]) {
      editor = new Editor(eRef.current);
      editor.config.menus = menus;
      editor.config.onchange = run;
      editor.config.uploadImgMaxLength = 5;
      editor.config.pasteFilterStyle = false;
      editor.config.showFullScreen = false;
      editor.config.onchangeTimeout = 500;
      editor.config.zIndex = 5;
      editor.config.customUploadImg = async function (
        // eslint-disable-next-line
        file: any,
        insertImgFn: (url: string) => void
      ) {
        // TODO 上传文件
        try {
          setLoading(true);
          const {
            data: { fileUpload },
          } = await uploadFileApi({ variables: { file: file[0] } });
          insertImgFn(fileUpload);
        } catch (e: unknown) {
          console.log(e, '上传文件错误');
          message.error('上传错误');
        } finally {
          setLoading(false);
        }
      };
      editor.config.pasteTextHandle = function (pasteStr) {
        return pasteStr.replace(/pt/gi, 'px');
      };
      editor.create();
      Object.assign(editorCache.current, { [id]: editor });
    }

    return () => editor.destroy();
    // eslint-disable-next-line
  }, []);
  useInitEffect(() => {
    if (!!value && editorCache.current[id]) {
      editorCache.current[id].txt.html(value);
    }
    // eslint-disable-next-line
  }, [value]);

  return (
    <>
      {loading && <Loading />}
      <div ref={eRef} />
    </>
  );
});
