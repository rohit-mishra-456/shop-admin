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
import { useNavigate, useParams } from "react-router-dom";
import { type } from "os";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useAddSingleImageMutation } from "../../queries/image";

interface DataType {
  key: string;
  name: string;
  image: any;
  brand: string;
  description: string;
  price: string;
}

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

  const navigate = useNavigate();
  const backNavigate = () => {
    navigate("/GiftBundle");
  };

  // cancel button navigate
  const cancelNavigate = () => {
    navigate("/GiftBundle");
  };
  const { data, isLoading, error } = useGetGiftBundleByIdQuery(id);

  const selectedIds = data?.data?.products;

  console.log(selectedIds, "Edit");

  // useState for updating api

  const [bundleData, setBundleData] = useState({
    name: "",
    description: "",
    image: "",
    products: [""],
  });

  const {
    data: editProducts,
    isLoading: editloadingProduct,
    error: editerrorProduct,
  } = useGetGiftBundleEditProductByIdQuery(id);
  console.log(editProducts, "TEST");

  const tableData: DataType[] = editProducts?.data?.products?.map(
    (el: any, i: any) => ({
      key: el?._id,
      image: (
        <div className="w-13 h-13">
          <img src={el?.images[0]?.url} className="h-15" />
        </div>
      ),
      name: el?.name,
      brand: el?.brand,
      description: el?.description,
      price: <>${el?.price}</>,
      loading: { editloadingProduct },
      error: { editerrorProduct },
    })
  );

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
      setBundleData({
        ...bundleData,
        products: selectedRows?.map((item) => item?.key),
      });
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  // update api (Edit)

  const [updateBundles] = useUpdateBundlesMutation();

  const updateBundleHandler = () => {
    const updateBundleData = { ...bundleData, id };
    updateBundles(updateBundleData).then((res: any) =>
      alert(res?.data?.message)
    );
  };

  // add image

  const [addSingleImage] = useAddSingleImageMutation();

  const uploadImageHandler = (e: any) => {
    console.log(e, "e");
    const fileType = e?.fileList?.[0]?.type.split("/")[1];
    console.log(fileType, "file");
    const dataToSend = {
      fileType,
      privateImage: false,
    };
    addSingleImage(dataToSend).then(
      (res) => {
        const { fileUrl } = res?.data?.data;
        console.log(fileUrl, "fileUrl");
        setBundleData({ ...bundleData, image: fileUrl });
      }
      // setBundleData({ ...bundleData, image: res?.data?.fileUrl })
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

  // if (error) {
  //   return <>Something Went Wrong...</>;
  // }

  return (
    <>
      <div className="">
        <Button
          className=" bg-[#3C50E0] w-12 h-12 rounded-full"
          onClick={backNavigate}
        >
          <FontAwesomeIcon size="xl" color="white" icon={faArrowLeft} />
        </Button>
      </div>
      <div className="mt-5 mb-5">
        <h2 className="text-[27px] font-semibold text-black">
          {id === "new" ? "Add" : "Edit"} Gift Bundle
        </h2>
      </div>

      <div className="rounded-lg border border-stroke bg-white ">
        <div className="mt-6 mb-4 ml-6">
          <Form
            name="wrap"
            labelCol={{ flex: "110px" }}
            labelAlign="left"
            labelWrap
            wrapperCol={{ flex: 1 }}
            colon={false}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              label={<h3 className="text-xl font-bold">Name</h3>}
              name="username"
              initialValue={data?.data?.name}
            >
              <Input
                className="border-0 rounded-none !shadow-none border-b-2 hover:border-black hover:shadow-none"
                onChange={(event) =>
                  setBundleData({ ...bundleData, name: event.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              label={<h3 className="text-xl font-bold">Description</h3>}
              name="description"
              initialValue={data?.data?.description}
            >
              <Input
                className="border-0 rounded-none !shadow-none border-b-2 hover:border-black hover:shadow-none"
                onChange={(event) =>
                  setBundleData({
                    ...bundleData,
                    description: event.target.value,
                  })
                }
              />
            </Form.Item>

            <Upload
              name="image"
              onChange={uploadImageHandler}
              listType="picture"
            >
              <label className="mr-18 text-9xl font-bold">Image</label>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
              <img src={data?.data?.image} alt="image" className="h-50 mt-10" />
            </Upload>
            {/* </Form.Item> */}
          </Form>
        </div>
      </div>

      <div className="rounded-lg border border-stroke bg-white mt-10">
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
            defaultSelectedRowKeys: selectedIds,
          }}
          columns={columns}
          dataSource={tableData}
        />
      </div>

      <div className=" flex justify-end gap-10 mt-5">
        <Button className="h-11" onClick={cancelNavigate}>
          Cancel
        </Button>
        <Button
          className="bg-blue-800 text-whiten hover:!bg-white hover:!text-black h-11"
          onClick={updateBundleHandler}
        >
          {id === "new" ? "ADD BUNDLE" : "Save Changes"}
        </Button>
      </div>
    </>
  );
};
