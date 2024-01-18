import { useNavigate } from "react-router-dom";
import Card from "../../customComponents/card.tsx";
import { useGetDashboardDataQuery } from "../../queries/dashboard.ts";
import {
  faUser,
  faCartShopping,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const TopCards = () => {
  const navigate = useNavigate();
  const handler = (key: string) => {
    let url = "/";
    if (key?.toLowerCase().includes("order")) url = "/orders?p=1";
    console.log(key);
    if (key?.toLowerCase().includes("user")) url = "/users?p=1";
  
    navigate(url);
  };
  const getIcon = (key: string) => {
    if (key?.toLowerCase().includes("order")) return faCartShopping;
    console.log(key);
    if (key?.toLowerCase().includes("totaluser")) return faUser;
    if (key?.toLowerCase().includes("newuser")) return faUsers;
  };
  const { data, isLoading } = useGetDashboardDataQuery(null);

  if (isLoading) {
    return <>loading</>;
  }
  console.log("data", data, "object", Object.entries(data.data));

  return (
    <>
      {data?.data &&
        Object.entries(data.data)?.map((el, i) => {
          // if(value?.length) {
          return (
            <Card
              key={i}
              title={el[0]}
              icon={getIcon(el[0])}
              count={+el?.[1] ?? 0}
              handler={() => handler(el[0])}
            />
          );
          // }
        })}
    </>
  );
};
