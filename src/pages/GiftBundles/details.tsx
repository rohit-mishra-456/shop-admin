import {
  useGetGiftBundleByIdQuery,
  useGetGiftBundleProductsByIdQuery,
} from "../../queries/giftBundle";
import { CardWithButton } from "../../customComponents/cardWithButton";
import { Button, Space, Table, Tag } from "antd";
import type { TableProps } from "antd";
import { useNavigate, useParams } from "react-router-dom";


interface DataType {
  key: string;
  name: string;
  image: any;
  brand: string;
  description: string;
  price: string;
}

export const details = () => {

  const {id} = useParams();

  // Details Table data
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Description",
      key: "description",
      dataIndex: "description",
    },
    {
      title: "Price",
      key: "price",
      dataIndex: "price",
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <Space size="middle">
    //       <a>Invite {record.name}</a>
    //       <a>Delete</a>
    //     </Space>
    //   ),
    // },
  ];

  const navigate = useNavigate();
  const handleButton = () => {
    navigate(`/editDetails/${id}`)
  }

  const actions = [<Button onClick={handleButton} >Edit</Button>];
  // details data
  const { data, isLoading, error } = useGetGiftBundleByIdQuery(
    id
  );

  // details table data
  const {
    data: detailsProduct,
    isLoading: loadingProduct,
    error: errorProduct,
  } = useGetGiftBundleProductsByIdQuery(id);
  console.log("Hyyy", detailsProduct);

  const tableData: DataType[] = detailsProduct?.data?.products?.map(
    (el: any, i:any) => ({
      key: i,
      image: <img src={el?.images[0]?.url} className="h-15" />,
      name: el?.name,
      brand: el?.brand,
      description: el?.description,
      price: <>${el?.price}</>,
      loading: { loadingProduct },
      error: { errorProduct },
    })
  );

  return (
    <div>
      <CardWithButton
        data={data?.data}
        isLoading={isLoading}
        error={error}
        actions={actions}
      />

      <Table columns={columns} dataSource={tableData} />
    </div>
  );
};
