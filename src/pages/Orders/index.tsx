import { Input, Select, Table, Tooltip } from "antd";
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
import { useState, useEffect } from "react";

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

  const [filterData, setFilterData] = useState({});
  const [key, setKey] = useState("Name");


  const  { data: ordersData, isLoading } = useGetOrdersQuery("");
 
//  useEffect(() => {
//   getOrders({...filterData}).then((res) => console.log(res,"res"))
//  },[filterData])

  const handleChange = (value: string) => {
    setKey(value);
    console.log(`selected ${value}`);
  };

  // const filterItem = ordersData?.data?.orders?.filter((user: any) => {
  //   console.log(user,"test rohit");
  //   return user?.name;
  // });


  const searchHandler = (e) => {
    let payload = {};
    payload = {
      ...payload,
      [key]:  e.target.value
    }
   console.log(payload,"payyyy")
   console.log('hnji2', payload.key)
  //  setFilterData(data.filter((el) => (el?.key === payload?.key && el[key]?.toLowerCase().includes(payload)))
  }

  const data: DataType[] = ordersData?.data?.orders?.map((el: any, i: any) => {
    const date = el?.bundlesDetails?.[0]?.updatedAt;
    return {
      key: i,
      sno: ` ${i + 1}`,
      image: (
        <div className="w-13 h-13">
          <img src={el?.bundlesDetails[0]?.image} />
        </div>
      ),
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
          <FontAwesomeIcon
            icon={faPen}
            onClick={(e) => {
              e.stopPropagation();
            }}
          />
        </div>
      ),
    };
  });
console.log('hnji', data);

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

        <div className="flex justify-around h-15 mb-5 gap-3">
          <div className="h-full">
            <Select
              defaultValue={key}
              style={{ width: 100, height: 60 }}
              onChange={handleChange}
              options={[
                { value: "Name", label: "Name" },
                { value: "Email", label: "Email" },
                { value: "OrderID", label: "Order ID" },
              ]}
            />
          </div>
          <div className="w-full h-full  ">
            <Input placeholder="Search" className="w-full h-full" onChange={searchHandler} />
          </div>

          <div className=" h-full">
            <Select
              defaultValue="All Status"
              style={{ width: 100, height: 60 }}
              onChange={handleChange}
              options={[
                { value: "All Status", label: "All Status" },
                { value: "Pending", label: "Pending" },
                { value: "Placed", label: "Placed" },
                { value: "Processed", label: "Processed" },
                { value: "Shipped", label: "Shipped" },
                { value: "Delivered", label: "Delivered" },
                { value: "Cancelled", label: "Cancelled" },
                { value: "Cancel Requested", label: "Cancel Requested" },
              ]}
            />
          </div>
        </div>

        <div className="border border-stroke rounded-lg cursor-pointer">
          <Table
            onRow={(record) => {
              return {
                onClick: () => viewOrder(record?.orderid),
              };
            }}
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
