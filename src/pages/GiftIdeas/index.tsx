import { CardWithButton } from "../../customComponents/cardWithButton";
import { useGetGiftIdeasQuery } from "../../queries/giftIdeas";

const GiftIdeas = () => {
  const {
    data: giftIdeaData,
    isLoading,
    error,
  } = useGetGiftIdeasQuery(null);

  return (
    <>
      {giftIdeaData?.data?.categories &&
        giftIdeaData?.data?.categories?.map((data: any) => {
          return (
            <CardWithButton data={data} isLoading={isLoading} error={error} />
          );
        })}
    </>
  );
};

export default GiftIdeas;
