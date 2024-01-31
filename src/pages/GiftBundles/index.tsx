import { useNavigate } from "react-router-dom";
import { CardWithButton } from "../../customComponents/cardWithButton";
import {
  useDeleteBundlesMutation,
  useGetGiftBundlesQuery,
} from "../../queries/giftBundle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { Button, Modal } from "antd";

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

  const addBundle = () => {
    navigate('/editDetails/new');
  }

  // dialog box for delete button

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currData, setCurrData] = useState<any>();

  const handleOk = (id: any) => {
    deleteBundle(id).then(() => refetchGiftBundles());
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function handleShowModal(data: any) {
    setCurrData(data);
    setIsModalOpen(true);
  }
  return (
    <>
    <div className='flex items-center justify-between mb-5'>
        <div>
          <h2 className='text-black text-3xl font-semibold'>Gift Bundles</h2>
          <p className='mt-0'>Total gift bundles: {giftBundleData?.data?.bundles?.length}</p>
        </div>
        <Button className='bg-blue-800 text-white h-10' onClick={addBundle} ><FontAwesomeIcon icon={faPlus} className='mr-1' />ADD GIFT IDEA</Button>
      </div>
    <div className="grid grid-cols-2 gap-4">
      {giftBundleData?.data?.bundles &&
        giftBundleData?.data?.bundles?.map((data: any) => {
          return (
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
                    onClick={() => {
                      handleShowModal(data);
                    }}
                    color="red"
                  />,
                ]}
              />
          );
        })}
      <Modal
        title={"Confirm Delete"}
        open={isModalOpen}
        onOk={() => handleOk(currData?._id)}
        onCancel={handleCancel}
        cancelText="no"
        okText="yes"
      >
        <p>
          Are you sure you want to delete <strong>{currData?.name}</strong>{" "}
          bundle?
        </p>
      </Modal>
    </div>
    </>
  );
};

export default GiftBundle;
