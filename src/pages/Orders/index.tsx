import { Input, Pagination, Popover, Select, Table, Tooltip } from "antd";
import type { TableColumnsType } from "antd";
import {
  useGetOrdersMutation,
  useUpdateOrderMutation,
} from "../../queries/order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faEye,
  faPen,
  faRotate,
  faSquareCheck,
  faTruck,
  faRectangleXmark,
  faCircleCheck,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCircleXmark,
  faClipboard,
} from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";

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
  ``;

  // orders api
  const navigate = useNavigate();
  const viewOrder = (id: any) => {
    navigate(`/ordersdetails/${id}`);
  };

  const [filteredData, setFilteredData] = useState({});
  const [key, setKey] = useState("Name");
  const [status, setStatus] = useState("");

  const [getOrders, { data: ordersData }] = useGetOrdersMutation();

  const [updateOrders] = useUpdateOrderMutation();

  const updateStatusHandler = (id: any, val: string) => {
    let payload = {};
    payload = {
      ...payload,
      id,
      status: val,
    };
    console.log(payload, "iiiiiiiiiii");
    updateOrders(payload).then((res) => console.log(res, "response"));
  };

  useEffect(() => {
    console.log("filterr", filteredData);
    getOrders(filteredData);
  }, [filteredData]);

  const userData = useMemo(() => ordersData?.data?.orders, [ordersData]);
  console.log("hnji", ordersData);

  const handleChange = useCallback((value: string) => {
    setKey(value);
    console.log(`selected ${value}`);
  }, []);

  let payload = {};
  const statusChange = useCallback((value: string) => {
    setStatus(value);
    payload = {
      ...payload,
      status: value,
    };
    setFilteredData(payload);
  }, []);

  //add debouncing
  const searchHandler = (e: any) => {
    // let payload = {};
    payload = {
      ...payload,
      [key]: e.target.value,
      status: status,
    };
    console.log(payload, "payyyy");
    setFilteredData(payload);
    console.log(filteredData, "filterdata");
  };

  // pagination code started here

  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 10;

  useEffect(() => {
    getOrders({ page: currentPage, limit: PAGE_SIZE });
    navigate(`/orders?p=${currentPage}`);
  }, [currentPage])

  const handlePageChange = (pagination: any) => {
    console.log('paginationn', pagination)
    setCurrentPage(pagination.current);
  }

  // const [currentPage, setCurrentPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);

  // useEffect(() => {
  //   getOrders({ page: currentPage, limit: pageSize });
  //   navigate(`/orders?p=${currentPage}`);
  // }, [currentPage, pageSize]);

  // const handlePageChange = (pagination: any) => {
  //   console.log("pagination", pagination);
  //   setCurrentPage(pagination.current);
  //   setPageSize(pagination.limit);
  // };

  // pagination code end

  // edit popup

  const [open, setOpen] = useState(false);

  const [popoverOpen, setPopoverOpen] = useState(null);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const data: DataType[] = userData?.map((el: any, i: any) => {
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
        )) ||
        (el?.status === "preparing" && (
          <Tooltip title="preparing">
            <FontAwesomeIcon icon={faClockRotateLeft} size="xl" />
          </Tooltip>
        )),
      total: el?.grandTotal.toFixed(2),
      action: (
        <div className="flex gap-3 cursor-pointer">
          <FontAwesomeIcon icon={faEye} onClick={() => viewOrder(el._id)} />

          {el?.status === "placed" ||
          el?.status === "shipped" ||
          el?.status === "preparing" ||
          el?.status === "processed" ? (
            <Popover
              content={
                <ul
                  className="mt-5"
                  onClick={(e: any) => {
                    e.stopPropagation();
                  }}
                >
                  <li className="flex justify-between mb-2">
                    <div className="flex w-10 gap-2">
                      <FontAwesomeIcon
                        icon={faBagShopping}
                        className="mt-0.5"
                      />
                      <h3>Placed</h3>
                    </div>
                    <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5" />
                  </li>
                  <li
                    className="flex justify-between mb-2"
                    onClick={() => {
                      updateStatusHandler(el?._id, "processed");
                    }}
                  >
                    <div className="flex w-10 gap-2">
                      <FontAwesomeIcon icon={faRotate} className="mt-0.5" />
                      <h3>Processed</h3>
                    </div>
                    <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5" />
                  </li>
                  <li
                    className="flex justify-between mb-2"
                    onClick={() => {
                      updateStatusHandler(el?._id, "shipped");
                    }}
                  >
                    <div className="flex w-10 gap-2">
                      <FontAwesomeIcon icon={faTruck} className="mt-0.5" />
                      <h3>Shipped</h3>
                    </div>
                    <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5" />
                  </li>
                  <li
                    className="flex justify-between mb-2"
                    onClick={() => {
                      updateStatusHandler(el?._id, "delivered");
                    }}
                  >
                    <div className="flex w-10 gap-2">
                      <FontAwesomeIcon
                        icon={faSquareCheck}
                        className="mt-0.5"
                      />
                      <h3>Delivered</h3>
                    </div>
                    <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5" />
                  </li>
                  <li
                    className="flex justify-between mb-2"
                    onClick={() => {
                      updateStatusHandler(el?._id, "cancelled");
                    }}
                  >
                    <div className="flex w-10 gap-2">
                      <FontAwesomeIcon
                        icon={faRectangleXmark}
                        className="mt-0.5"
                      />
                      <h3>Cancelled</h3>
                    </div>
                    <FontAwesomeIcon icon={faCircleCheck} className="mt-0.5" />
                  </li>
                </ul>
              }
              title="Update Order Status"
              trigger="click"
              open={open && popoverOpen === el._id}
              onOpenChange={handleOpenChange}
            >
              {/* here */}
              <Tooltip title="Update Order Status">
                <FontAwesomeIcon
                  icon={faPen}
                  onClick={(e) => {
                    e.stopPropagation();
                    setPopoverOpen(el._id);
                  }}
                />
              </Tooltip>
            </Popover>
          ) : (
            <Tooltip title="can't update order status">
              <FontAwesomeIcon
                icon={faPen}
                style={{ opacity: 0.5 }}
                onClick={(e) => {
                  e.stopPropagation();
                }} // Adjust opacity to indicate it's disabled
              />
            </Tooltip>
          )}
        </div>
      ),
    };
  });

  return (
    <div>
      <div>
        <h2 className="text-black text-3xl font-semibold">All Orders</h2>
        <p className="mt-4">Total orders: {ordersData?.data?.orders?.length}</p>
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
          <Input
            placeholder="Search"
            className="w-full h-full"
            onChange={searchHandler}
          />
        </div>

        <div className=" h-full">
          <Select
            defaultValue={status}
            style={{ width: 100, height: 60 }}
            onChange={statusChange}
            options={[
              { value: "", label: "All Status" },
              { value: "pending", label: "Pending" },
              { value: "placed", label: "Placed" },
              { value: "processed", label: "Processed" },
              { value: "shipped", label: "Shipped" },
              { value: "delivered", label: "Delivered" },
              { value: "cancelled", label: "Cancelled" },
              { value: "cancel-requested", label: "Cancel Requested" },
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
          // pagination={{ defaultPageSize: 5 }}
          onChange={handlePageChange}
          scroll={{ x: 1300 }}
          columns={columns}
          dataSource={data}
        />
      </div>
    </div>
  );
};

export default Orders;
