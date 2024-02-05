import { Card } from "antd";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../queries/order";


const OrderDetails: React.FC = () => {
  const { id } = useParams();

  const { data: viewOrderData, isLoading, error } = useGetOrderByIdQuery(id);
  console.log(viewOrderData, "check");

  return (
    <>
    {
      viewOrderData && Object.entries(viewOrderData?.data)?.map((el: any, i) => {
        console.log('hnjii', el)
        if(el[0] === 'userId' || el[0] === 'paymentDetails' || el[0] === 'shippingAddress')
        return (
                <Card title={el[0]} bordered={false} style={{ width: 300, marginBottom:'1rem' }}>
                <p>Name : {el[1]?.name}</p>
                <p>Address: {el[1]?.address}</p>
          </Card>
        )
      })
    }
  </>
  );
};

export default OrderDetails;
