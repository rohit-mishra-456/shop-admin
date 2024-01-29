import {
  useGetGiftBundleByIdQuery,
  useGetGiftBundleEditProductByIdQuery,
  useUpdateBundlesMutation,
} from "../../queries/giftBundle";
import {
  Button,
  Divider,
  Form,
  Input,
  Radio,
  Space,
  Table,
  Upload,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import type { TableProps } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { type } from "os";

interface DataType {
  key: string;
  name: string;
  image: any;
  brand: string;
  description: string;
  price: string;
}

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
  }),
};

export const editDetails = () => {
  const { id } = useParams();

  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );

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

  const { data, isLoading, error } = useGetGiftBundleByIdQuery(id);
  console.log(data?.data, "Edit");

  const {
    data: editProducts,
    isLoading: editloadingProduct,
    error: editerrorProduct,
  } = useGetGiftBundleEditProductByIdQuery(id);
  console.log(editProducts, "TEST");

  const tableData: DataType[] = editProducts?.data?.products?.map(
    (el: any, i: any) => ({
      key: i,
      image: <img src={el?.images[0]?.url} className="h-15" />,
      name: el?.name,
      brand: el?.brand,
      description: el?.description,
      price: <>${el?.price}</>,
      loading: { editloadingProduct },
      error: { editerrorProduct },
    })
  );

  // useState for updating api

  const [bundleData, setBundleData] = useState({
    name: "",
    description: "",
    image: "",
    products: [],
  });

  // update api (Edit)

  const [updateBundles] = useUpdateBundlesMutation();

  const updateBundleHandler = () => {
    const updateBundleData = { ...bundleData, id };
    updateBundles(updateBundleData).then((res: any) =>
      alert(res?.data?.message)
    );
  };

  useEffect(() => {
    if (id && data) {
      setBundleData({
        name: data?.data?.name,
        description: data?.data?.description,
        image: data?.data?.image,
        products: data?.data?.products,
      });
    }
  }, [data]);

  if (isLoading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Something Went Wrong...</>;
  }

  return (
    <>
      <Form
        name="wrap"
        labelCol={{ flex: "110px" }}
        labelAlign="left"
        labelWrap
        wrapperCol={{ flex: 1 }}
        colon={false}
        style={{ maxWidth: 600 }}
      >
        <Form.Item label="Name" name="username" initialValue={data?.data?.name}>
          <Input
            onChange={(event) =>
              setBundleData({ ...bundleData, name: event.target.value })
            }
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          initialValue={data?.data?.description}
        >
          <Input
            onChange={(event) =>
              setBundleData({ ...bundleData, description: event.target.value })
            }
          />
        </Form.Item>

        {/* <Form.Item
          name="upload"
          label="Image"
          valuePropName="fileList"
          initialValue={
            <>
              <img src={data?.data?.image} alt="image" />
            </>
          }
        >
          <Input
            onChange={(event) =>
              setBundleData({ ...bundleData, image: event.target.value })
            } type="file"
          /> */}

        <Upload
          name="image"
          // onChange={({ file, fileList }) => {
          //   if (file.status !== 'uploading') {
          //   console.log("hnji..", file, fileList);
          //   }
          // }}
          listType="picture"
        >
          <label className="mr-15">Image</label>
          <Button icon={<UploadOutlined />}>Click to upload</Button>
          <img src={data?.data?.image} alt="image" className="h-50 mt-10" />
        </Upload>
        {/* </Form.Item> */}
      </Form>
      <br />

      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={tableData}
      />

      <div className=" flex justify-end gap-10">
        <Button className="h-11">Cancel</Button>
        <Button
          className="bg-blue-800 text-whiten hover:!bg-white hover:!text-black h-11"
          onClick={updateBundleHandler}
        >
          Save Changes
        </Button>
      </div>
    </>
  );
};
