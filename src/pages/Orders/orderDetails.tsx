import { Button, Card } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../queries/order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCreditCard,
  faTruck,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
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

  const viewhandler = (id: any) => {
    navigate(`/details/${id}`);
  };

  const { data: viewOrderData, isLoading, error } = useGetOrderByIdQuery(id);
  console.log(viewOrderData, "check");

  const Orderdata: DataType[] = viewOrderData?.data?.bundles?.map(
    (el: any, i: any) => {
      console.log("111", viewOrderData?.data?.bundles);
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
        <Button
          className=" bg-[#3C50E0] w-12 h-12 rounded-full"
          onClick={backNavigate}
        >
          <FontAwesomeIcon size="xl" color="white" icon={faArrowLeft} />
        </Button>
      </div>
      <div className="mt-5 mb-5">
        <h2 className="text-[27px] font-semibold text-black">Order Details</h2>
      </div>
      <div className="bg-white">
        <div className="flex justify-between">
          <div className="m-5 text-black-2">
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
            <a href="/demo.pdf" target="_blank">
              <Button className="bg-blue-800 text-white h-10">
                VIEW INVOICE
              </Button>
            </a>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 m-10">
          <Card
            title={<h3>Customer</h3>}
            bordered={false}
            style={{ width: 350, marginBottom: "1rem", lineHeight: 2 }}
          >
            <div className="flex justify-between ">
              <div className="h-11 w-11 rounded-full bg-slate-500 ">
                <FontAwesomeIcon icon={faUser} size="xl" className="m-3" />
              </div>
              <div>
                <p>
                  Name: <strong>{viewOrderData?.data?.userId?.name}</strong>
                </p>
                <p>
                  Email: <strong>{viewOrderData?.data?.userId?.email}</strong>
                </p>
                <p>
                  User Id: <strong>{viewOrderData?.data?.userId?._id}</strong>
                </p>
                <p>
                  Contact No. :{" "}
                  <strong>
                    {viewOrderData?.data?.shippingAddress?.mobile}
                  </strong>
                </p>
              </div>
            </div>
          </Card>
          <Card
            title={<h3>Payment Details</h3>}
            bordered={false}
            style={{ width: 350, marginBottom: "1rem", lineHeight: 2 }}
          >
            <div className="flex justify-between ">
              <div className="h-12 w-12 rounded-full bg-slate-500 ">
                <FontAwesomeIcon
                  icon={faCreditCard}
                  size="xl"
                  className="m-3"
                />
              </div>
              <div>
                <p>
                  Sub Total: <strong>{viewOrderData?.data?.total}</strong>
                </p>
                <p>
                  Shipping Charges:{" "}
                  <strong>{viewOrderData?.data?.shippingCharges}</strong>
                </p>
                <p>
                  Tax: <strong>{viewOrderData?.data?.tax}</strong>
                </p>
                <p>
                  Total:{" "}
                  <strong>{viewOrderData?.data?.grandTotal.toFixed(2)}</strong>
                </p>
                <p>
                  Payment Status:{" "}
                  <strong>{viewOrderData?.data?.paymentStatus}</strong>
                </p>
              </div>
            </div>
          </Card>
          <Card
            title={<h3>Shipping Details</h3>}
            bordered={false}
            style={{ width: 350, marginBottom: "1rem", lineHeight: 2 }}
          >
            <div className="flex justify-between ">
              <div className="h-11 w-11 rounded-full bg-slate-500 mr-10 ">
                <FontAwesomeIcon icon={faTruck} size="xl" className="m-3" />
              </div>
              <div>
                <p>
                  Shipping Address:{" "}
                  <strong>
                    {viewOrderData?.data?.shippingAddress?.name},
                    {viewOrderData?.data?.shippingAddress?.address},{" "}
                    {viewOrderData?.data?.shippingAddress?.landmark},
                    {viewOrderData?.data?.shippingAddress?.pincode}
                  </strong>
                </p>
                <p>
                  Status: <strong>{viewOrderData?.data?.status}</strong>
                </p>
                <p>
                  Shipping Status:{" "}
                  <strong>
                    {viewOrderData?.data?.shippingStatus === "" && "N/A"}
                  </strong>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="border border-stroke rounded-lg cursor-pointer">
        <h1 className="text-3xl m-2 text-black-2 font-medium">Gift Bundles</h1>
        <Table
          onRow={(record: DataType, index?: number) => {
            console.log("record", record);
            return {
              onClick: () =>
                viewhandler(
                  viewOrderData?.data?.bundles[index ?? 0]?.bundleId?._id
                ),
            };
          }}
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={Orderdata}
        />
        ;
      </div>
    </>
  );
};

export default OrderDetails;
