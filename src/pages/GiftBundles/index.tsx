import { CardWithButton } from "../../customComponents/cardWithButton";
import { useGetGiftBundlesQuery } from "../../queries/giftBundle";

const GiftBundle = () => {
  const {
    data: giftBundleData,
    isLoading,
    error,
  } = useGetGiftBundlesQuery(null);

  console.log(giftBundleData, "Kaise ho");
  return (
    <>
      {giftBundleData?.data?.bundles &&
        giftBundleData?.data?.bundles?.map((data: any) => {
          return (
            <CardWithButton data={data} isLoading={isLoading} error={error} />
          );
        })}
    </>
  );
};

export default GiftBundle;
