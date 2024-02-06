import { Table, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import { useGetOrdersQuery } from "../../queries/order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faEye,
  faPen,
  faRotate,
  faSquareCheck,
  faTruck,
  faRectangleXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleXmark,
  faClipboard,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

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
  action: any;
}

const columns: TableColumnsType<DataType> = [
  {
    title: "S.no",
    dataIndex: "sno",
  },
  {
    title: "Image",
    dataIndex: "image",
  },
  {
    title: "Username",
    dataIndex: "username",
  },
  {
    title: "Email ID",
    dataIndex: "email",
  },
  {
    title: "Order ID",
    dataIndex: "orderid",
  },
  {
    title: "Order Date",
    dataIndex: "orderdate",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Total",
    dataIndex: "total",
  },
  {
    title: "Actions",
    dataIndex: "action",
  },
];

const Orders: React.FC = () => {
  // orders api

  const navigate = useNavigate();
  const viewOrder = (id: any) => {
    navigate(`/ordersdetails/${id}`);
  };

  const { data: ordersData, isLoading } = useGetOrdersQuery(1);
  console.log(ordersData, "ROHIT");

  const data: DataType[] = ordersData?.data?.orders?.map((el: any, i: any) => {
    console.log(new Date(el?.bundlesDetails?.[0]?.updatedAt)?.getDate());
    const date = el?.bundlesDetails?.[0]?.updatedAt;
    return {
      key: i,
      sno: ` ${i + 1}`,
      image: <img src={el?.bundlesDetails[0]?.image} className="h-15" />,
      username: el?.user?.name,
      email: el?.user?.email,
      orderid: el?.orderItems?.[0]?.orderId,
      orderdate:
        new Date(date).getDate() +
        "/" +
        (new Date(date).getMonth() + 1) +
        "/" +
        new Date(date).getFullYear(),
      status:
        (el?.status === "placed" && (
          <Tooltip title="placed">
            <FontAwesomeIcon icon={faBagShopping} size="xl" />
          </Tooltip>
        )) ||
        (el?.status === "cancel-requested" && (
          <Tooltip title="cancel-requested">
            <FontAwesomeIcon icon={faCircleXmark} size="xl" />
          </Tooltip>
        )) ||
        (el?.status === "pending" && (
          <Tooltip title="pending">
            <FontAwesomeIcon icon={faClipboard} size="xl" />
          </Tooltip>
        )) ||
        (el?.status === "shipped" && (
          <Tooltip title="shipped">
            <FontAwesomeIcon icon={faTruck} size="xl" />
          </Tooltip>
        )) ||
        (el?.status === "processed" && (
          <Tooltip title="processed">
            <FontAwesomeIcon icon={faRotate} size="xl" />
          </Tooltip>
        )) ||
        (el?.status === "cancelled" && (
          <Tooltip title="cancelled">
            <FontAwesomeIcon icon={faRectangleXmark} size="xl" />
          </Tooltip>
        )) ||
        (el?.status === "delivered" && (
          <Tooltip title="delivered">
            <FontAwesomeIcon icon={faSquareCheck} size="xl" />
          </Tooltip>
        )),
      total: el?.grandTotal.toFixed(2),
      action: (
        <div className="flex gap-3 cursor-pointer">
          <FontAwesomeIcon icon={faEye} onClick={() => viewOrder(el._id)} />
          <FontAwesomeIcon icon={faPen} />
        </div>
      ),
    };
  });

  if (isLoading) {
    return <>Loading...</>;
  } else
    return (
      <div>
        <div>
          <h2 className="text-black text-3xl font-semibold">All Orders</h2>
          <p className="mt-4">
            Total orders: {ordersData?.data?.orders?.length}
          </p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <span style={{ marginLeft: 8 }}></span>
        </div>
        <div className="border border-stroke rounded-lg cursor-pointer">
          <Table
            pagination={{ defaultPageSize: 10 }}
            scroll={{ x: 1300 }}
            columns={columns}
            dataSource={data}
          />
        </div>
      </div>
    );
};

export default Orders;
