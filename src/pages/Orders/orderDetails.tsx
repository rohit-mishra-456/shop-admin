import { Button, Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../queries/order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Space, Table, Tag } from "antd";
import type { TableProps } from "antd";

interface DataType {
  image: any;
  name: string;
  description: string;
  quantity: string;
  price: string;
  weight: string;
}

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
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Qty",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Weight (in kg)",
    dataIndex: "weight",
    key: "weight",
  },
];

const OrderDetails: React.FC = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const backNavigate = () => {
    navigate("/orders");
  };

  const { data: viewOrderData, isLoading, error } = useGetOrderByIdQuery(id);
  console.log(viewOrderData, "check");

  const Orderdata: DataType[] = viewOrderData?.data?.bundles?.map(
    (el: any, i: any) => {
      console.log(viewOrderData?.data?.bundles?.[0]?.bundleId, "Anhnnn");
      return {
        image: (
          <img
            className="w-auto h-10"
            src={el?.bundleId?.image}
            alt="ordertableimage"
          ></img>
        ),
        name: el?.bundleId?.name,
        description: el?.bundleId?.description,
        quantity: el?.quantity,
        price: el?.price ?? "N/A",
        weight: el?.weight ?? "N/A",
      };
    }
  );

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <div className="">
        <Button className=" bg-[#3C50E0] w-12 h-12 rounded-full">
          <FontAwesomeIcon
            size="xl"
            color="white"
            icon={faArrowLeft}
            onClick={backNavigate}
          />
        </Button>
      </div>
      <div className="mt-5 mb-5">
        <h2 className="text-[27px] font-semibold text-black">Order Details</h2>
      </div>
      <div className="bg-white">
        <div className="flex justify-between">
          <div className="m-5">
            <strong>
              <h2>Order ID: #{viewOrderData?.data?.bundles?.[0]?.orderId}</h2>
            </strong>
            <h2>
              Order Date:{" "}
              {new Date(viewOrderData?.data?.statusDate).getMonth() +
                1 +
                "/" +
                new Date(viewOrderData?.data?.statusDate).getDate() +
                "/" +
                +new Date(viewOrderData?.data?.statusDate).getFullYear()}
            </h2>
          </div>
          <div className="m-5">
            <a href="/demo.pdf" target="_blank" >
            <Button className="bg-blue-800 text-white h-10">
              VIEW INVOICE
            </Button>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Card
            title={<h3>Customer</h3>}
            bordered={false}
            style={{ width: 300, marginBottom: "1rem" }}
          >
            <p>Name: {viewOrderData?.data?.userId?.name}</p>
            <p>Email: {viewOrderData?.data?.userId?.email}</p>
            <p>User Id: {viewOrderData?.data?.userId?._id}</p>
            <p>Contact No. : {viewOrderData?.data?.shippingAddress?.mobile}</p>
          </Card>
          <Card
            title={<h3>Payment Details</h3>}
            bordered={false}
            style={{ width: 300, marginBottom: "1rem" }}
          >
            <p>Sub Total: {viewOrderData?.data?.total}</p>
            <p>Shipping Charges: {viewOrderData?.data?.shippingCharges}</p>
            <p>Tax: {viewOrderData?.data?.tax}</p>
            <p>Total: {viewOrderData?.data?.grandTotal.toFixed(2)}</p>
            <p>Payment Status: {viewOrderData?.data?.paymentStatus}</p>
          </Card>
          <Card
            title={<h3>Shipping Details</h3>}
            bordered={false}
            style={{ width: 300, marginBottom: "1rem" }}
          >
            <p>
              Shipping Address: {viewOrderData?.data?.shippingAddress?.name},
              {viewOrderData?.data?.shippingAddress?.address},{" "}
              {viewOrderData?.data?.shippingAddress?.landmark},
              {viewOrderData?.data?.shippingAddress?.pincode}
            </p>
            <p>Status: {viewOrderData?.data?.status}</p>
            <p>
              Shipping Status:{" "}
              {viewOrderData?.data?.shippingStatus === "" && "N/A"}
            </p>
          </Card>
        </div>
      </div>

      <div className="border border-stroke rounded-lg cursor-pointer">
        <h1 className="text-3xl m-2 text-black-2 font-medium">Gift Bundles</h1>
        <Table scroll={{ x: 1300 }} columns={columns} dataSource={Orderdata} />;
      </div>
    </>
  );
};

export default OrderDetails;
