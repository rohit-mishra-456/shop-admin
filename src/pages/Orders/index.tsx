import React, { useState } from 'react';
import { Button, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useGetOrdersQuery } from '../../queries/order';

interface DataType {
  key: React.Key;
  sno: string;
  image: string;
  username: string;
  email: string;
  orderid: string;
  orderdate: number;
  status: any;
  total: string;

}

const columns: TableColumnsType<DataType> = [
  {
    title: 'S.no',
    dataIndex: 'sno',
  },
  {
    title: 'Image',
    dataIndex: 'image',
  },
  {
    title: 'Username',
    dataIndex: 'username',
  },
  {
    title: 'Email ID',
    dataIndex: 'email',
  },
  {
    title: 'Order ID',
    dataIndex: 'orderid',
  },
  {
    title: 'Order Date',
    dataIndex: 'orderdate',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Total',
    dataIndex: 'total',
  },
];



const Orders: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);

  // orders api

  const { data:ordersData, isLoading, error } = useGetOrdersQuery(1);
  console.log(ordersData, "ROHIT")

  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const data: DataType[] = ordersData?.data?.orders?.map((el: any, i: any) => {
    console.log('el',i, 'datee', el?.bundlesDetails?.[0]?.updatedAt, 'hnji',  new Date(el?.bundlesDetails?.[0]?.updatedAt)?.getDate());
    const date = el?.bundlesDetails?.[0]?.updatedAt;
      return ({
        key: i,
        sno: ` ${i+1}`,
        image: <img src={el?.bundlesDetails[0]?.image} className="h-15" />,
        username: el?.user?.name,
        email: el?.user?.email,
        orderid: el?.orderItems?.[0]?.orderId,
        orderdate: ((new Date(date).getDate()) + '/' + (new Date(date).getMonth()+1) + '/' + (new Date(date).getFullYear())),
        status: "",
        total: "",
      });
  } );
  // console.log(data, "apis")

  const hasSelected = selectedRowKeys.length > 0;

  if(isLoading) {
    return <>Loading...</>;
  }else
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
          Reload
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
        </span>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};

export default Orders;