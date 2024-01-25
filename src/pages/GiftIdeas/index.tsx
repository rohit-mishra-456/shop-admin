import { CardWithButton } from "../../customComponents/cardWithButton";
import { useGetGiftIdeasQuery } from "../../queries/giftIdeas";

const GiftIdeas = () => {
  const { data: giftIdeaData, isLoading, error } = useGetGiftIdeasQuery(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {giftIdeaData?.data?.categories &&
          giftIdeaData?.data?.categories?.map((data: any) => {
            return (
              <CardWithButton data={data} isLoading={isLoading} error={error} />
            );
          })}
      </div>
    </>
  );
};

export default GiftIdeas;
