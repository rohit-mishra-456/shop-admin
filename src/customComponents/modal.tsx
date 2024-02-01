import { Modal } from "antd";
import { ReactNode } from "react";
interface CustomModalProps {
    title: string;
    open: boolean;
    onOk: any;
    onCancel: any;
    cancelText: string;
    okText: string;
    message: ReactNode;
  }
export const CustomModal = ({
  title,
  open,
  onOk,
  onCancel,
  cancelText,
  okText,
  message,
}: CustomModalProps) => {
  return (
    <Modal
      title={title}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      cancelText={cancelText}
      okText={okText}
    >
      <p>{message}</p>
    </Modal>
  );
};
