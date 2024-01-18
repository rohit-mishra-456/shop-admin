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
      images: el?.profileImage,
    };
  });

  //   Gift Ideas map function here
  const ideas = giftIdeasData?.data?.categories?.map((el: any) => {
    return {
      // _id: el?._id,
      name: el?.name,
      description: el?.description,
      images: el?.image,
    };
  });

  return (
    <>
      <Lists
        title="Gift Bundles"
        handler={() => {}}
        data={giftBundlesData?.data?.bundles}
        isLoading={loadingBundle}
        error={errorBundle}
      />

      <Lists
        title="Orders"
        handler={() => {}}
        data={orders}
        isLoading={loadingOrder}
        error={errorOrder}
      />
      <Lists
        title="Users"
        handler={() => {}}
        data={users}
        isLoading={loadingUser}
        error={errorUser}
      />
      <Lists
        title="Gift Ideas"
        handler={() => {}}
        data={ideas}
        isLoading={lodingIdeas}
        error={errorIdeas}
      />
    </>
  );
};
