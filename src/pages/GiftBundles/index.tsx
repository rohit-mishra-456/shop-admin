import { useNavigate } from "react-router-dom";
import { CardWithButton } from "../../customComponents/cardWithButton";
import {  useGetGiftBundlesQuery } from "../../queries/giftBundle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const GiftBundle = () => {
  const {
    data: giftBundleData,
    isLoading,
    error,
  } = useGetGiftBundlesQuery(null);

  const navigate = useNavigate();

  const viewhandler = (id:any) => {
    navigate(`/details/${id}`);
  };

  const edithandler = (id:any) => {
    navigate(`/editDetails/${id}`);
  };

  const deletehandler = () => {
    navigate("/GiftBundle");
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {giftBundleData?.data?.bundles &&
        giftBundleData?.data?.bundles?.map((data: any) => {
          return (
            <CardWithButton
              data={data}
              isLoading={isLoading}
              error={error}
              actions={[
                <FontAwesomeIcon icon={faEye} onClick={() => viewhandler( data._id )} />,
                <FontAwesomeIcon icon={faPen} onClick={() => edithandler( data._id )} />,
                <FontAwesomeIcon icon={faTrash} onClick={deletehandler} color="red" />,
              ]}
            />
          );
        })}
    </div>
  );
};

export default GiftBundle;
