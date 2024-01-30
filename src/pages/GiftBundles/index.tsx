import { useNavigate } from "react-router-dom";
import { CardWithButton } from "../../customComponents/cardWithButton";
import {
  useDeleteBundlesMutation,
  useGetGiftBundlesQuery,
} from "../../queries/giftBundle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Modal } from "antd";

const GiftBundle = () => {
  const {
    data: giftBundleData,
    isLoading,
    error,
    refetch: refetchGiftBundles,
  } = useGetGiftBundlesQuery(null);

  const [deleteBundle] = useDeleteBundlesMutation();

  useEffect(() => {
    refetchGiftBundles();
  }, []);

  const navigate = useNavigate();

  const viewhandler = (id: any) => {
    navigate(`/details/${id}`);
  };

  const edithandler = (id: any) => {
    navigate(`/editDetails/${id}`);
  };

  // const deletehandler = (id: any) => {
  //   deleteBundle(id);
  //   refetchGiftBundles();
  // };

  // dialog box for delete button

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currData,setCurrData] = useState<any>();

  const handleOk = (id: any) => {
    deleteBundle(id);
    setIsModalOpen(false);
    refetchGiftBundles();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function handleShowModal(data: any) {
    setCurrData(data);
    setIsModalOpen(true);
  }
  return (
    <div className="grid grid-cols-2 gap-4">
      {giftBundleData?.data?.bundles &&
        giftBundleData?.data?.bundles?.map((data: any) => {

          return (
            <>
              <CardWithButton
                data={data}
                isLoading={isLoading}
                error={error}
                actions={[
                  <FontAwesomeIcon
                    icon={faEye}
                    onClick={() => viewhandler(data._id)}
                  />,
                  <FontAwesomeIcon
                    icon={faPen}
                    onClick={() => edithandler(data._id)}
                  />,
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={()=>{
                      handleShowModal(data);
                    }}
                    color="red"
                  />,
                ]}
              />
              
            </>
          );
        })}
        <Modal
                title={"Confirm Delete"}
                open={isModalOpen}
                onOk={() => handleOk(currData?._id)}
                onCancel={handleCancel}
                cancelText='no'
                okText={<h4 className="" >yes</h4>}
              >
                <p>Are you sure you want to delete <strong>{(currData?.name)}</strong> bundle?</p>
              </Modal>
    </div>
  );
};

export default GiftBundle;
