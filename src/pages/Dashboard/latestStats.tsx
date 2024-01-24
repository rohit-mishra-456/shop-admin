import { useNavigate } from "react-router-dom";
import { Lists } from "../../customComponents/lists.tsx";
import { useGetGiftBundlesQuery } from "../../queries/giftBundle.ts";
import { useGetGiftIdeasQuery } from "../../queries/giftIdeas.ts";
import { useGetOrdersQuery } from "../../queries/order.ts";
import { useGetUsersQuery } from "../../queries/users.ts";

export const LatestStats = () => {
  const {
    data: giftBundlesData,
    isLoading: loadingBundle,
    error: errorBundle,
  } = useGetGiftBundlesQuery(null);

  // console.log(giftBundlesData, "to kaise hai aap log")

  const {
    data: ordersData,
    isLoading: loadingOrder,
    error: errorOrder,
  } = useGetOrdersQuery(null);

  const {
    data: userData,
    isLoading: loadingUser,
    error: errorUser,
  } = useGetUsersQuery(null);

  const {
    data: giftIdeasData,
    isLoading: lodingIdeas,
    error: errorIdeas,
  } = useGetGiftIdeasQuery(null);

  console.log(giftIdeasData);

  const navigate = useNavigate();
  const handler = (key: string) => {
    let url = "/";
    if (key?.toLowerCase().includes("bundles")) url = "/GiftBundle";
    if (key?.toLowerCase().includes("order")) url = "/orders?p=1";
    if (key?.toLowerCase().includes("user")) url = "/calendar?p=1";
    if (key?.toLowerCase().includes("gift-ideas")) url = "/gift-ideas?p=1";

    navigate(url);
  };

  //   bundles map function here
  const bundles = giftBundlesData?.data?.bundles?.map((el: any) => {
    return {
      _id: el?._id,
      name: el?.name,
      image: el?.image,
      description: el?.description,
    };
  });

  //   orders map function here
  const orders = ordersData?.data?.orders?.map((el: any) => {
    return {
      _id: el?._id,
      name: el?.bundlesDetails?.[0]?.name,
      price: el?.total,
      image: el?.bundlesDetails?.[0]?.image,
    };
  });

  //   user map function here
  const users = userData?.data?.users?.map((el: any) => {
    return {
      // _id: el?._id,
      name: el?.name,
      email: el?.email,
      image: el?.profileImage,
    };
  });

  //   Gift Ideas map function here
  const ideas = giftIdeasData?.data?.categories?.map((el: any) => {
    return {
      // _id: el?._id,
      name: el?.name,
      description: el?.description,
      image: el?.image,
    };
  });

  return (
    <>
      <Lists
        title="Gift Bundles"
        handler={() => handler("giftBundles")}
        data={bundles}
        isLoading={loadingBundle}
        error={errorBundle}
      />

      <Lists
        title="Orders"
        handler={() => handler("orders")}
        data={orders}
        isLoading={loadingOrder}
        error={errorOrder}
      />
      <Lists
        title="Users"
        handler={() => handler("users")}
        data={users}
        isLoading={loadingUser}
        error={errorUser}
      />
      <Lists
        title="Gift Ideas"
        handler={() => handler("gift-Ideas")}
        data={ideas}
        isLoading={lodingIdeas}
        error={errorIdeas}
      />
    </>
  );
};
