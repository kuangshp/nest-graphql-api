import React, { useState } from 'react';
// import styles from './Personal.module.scss';
import { Row, Col, Table, Typography } from 'antd';
import { PersonCard } from 'src/components';
import { EditPersonalModal, Focus } from './components';

export interface ITable {
  id: number;
  label: string;
  key: string;
  isImg?: boolean;
}
export const Personal: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [rowData, setRowData] = useState<ITable | null>(null);
  const editRow = (rowData: ITable) => {
    console.log(rowData);
    setIsModalVisible(true);
    setRowData(rowData);
  };
  const closeModalHandler = (isSave?: boolean) => {
    console.log(isSave, '是否保存');
    setIsModalVisible(false);
  };
  const data: ITable[] = [
    {
      id: 0,
      label:
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3140856871,3824911270&fm=26&gp=0.jpg',
      key: 'avatar',
      isImg: true,
    },
    {
      id: 1,
      label: '110',
      key: 'mobile',
    },
    {
      id: 2,
      label: '搬砖码农',
      key: 'nickName',
    },
  ];
  const columns = [
    {
      dataIndex: 'label',
      key: 'label',
      render: (_: unknown, record: ITable) => {
        if (record.isImg) {
          return (
            <img
              src={record.label}
              alt=""
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
          );
        } else {
          return <span>{record.label}</span>;
        }
      },
    },
    {
      key: 'action',
      width: 100,
      render: (_: unknown, record: ITable) => (
        <Typography.Link onClick={() => editRow(record)}>编辑</Typography.Link>
      ),
    },
  ];
  return (
    <Row gutter={20}>
      <Col span={6}>
        <PersonCard />
        <Focus />
      </Col>
      <Col span={18}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          showHeader={false}
          rowKey="key"
        />
      </Col>
      <EditPersonalModal
        isModalVisible={isModalVisible}
        setIsModalVisible={closeModalHandler}
        rowData={rowData}
      />
    </Row>
  );
};
