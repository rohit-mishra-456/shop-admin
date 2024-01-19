import { BundleCard } from "../../customComponents/BundleCard";
import { useGetGiftBundlesQuery } from "../../queries/giftBundle";

 const GiftBundle = () => {

    const {
        data: giftBundleData,
        isLoading: loadingBundle,
        error: errorBundle,
      } = useGetGiftBundlesQuery(null);

      console.log(giftBundleData,"Kaise ho");

        //   bundles map function here
        //
  const bundles = giftBundleData?.data?.bundles?.map((el: any) => {
    return {
      name: el?.name,
      image: el?.image,
      description: el?.description,
      price: el?.price,
    };
  });

  return (
    <>
    <BundleCard
        title="Gift Bundles"
        // handler={() => }
        data={bundles}
        isLoading={loadingBundle}
        error={errorBundle}
      />
    </>
  );
};

export default GiftBundle;