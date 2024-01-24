import { useGetGiftBundleByIdQuery, useGetGiftBundleEditProductByIdQuery } from "../../queries/giftBundle";
import { Button, Form, Input, Upload } from "antd";
import {  UploadOutlined } from '@ant-design/icons';

export const editDetails = () => {
  const { data, isLoading, error } = useGetGiftBundleByIdQuery(
    "65a61c540b0c8cf2704d6362"
  );
  console.log(data?.data, "Edit");


  const {data: editProducts} = useGetGiftBundleEditProductByIdQuery("65a61c540b0c8cf2704d6362");
  console.log(editProducts, "TEST")

if(isLoading){
    return<>Loading...</>
}

  return (

    <Form
      name="wrap"
      labelCol={{ flex: "110px" }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      colon={false}
      style={{ maxWidth: 600 }}
    >
      <Form.Item
        label="Name"
        name="username"
        initialValue={data?.data?.name}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="password"
        initialValue={data?.data?.description}
      >
        <Input />
      </Form.Item>

        <label className="mr-18">Image</label>
      <Upload name="logo" action="/upload.do" listType="picture">
        <Button icon={<UploadOutlined />}>Click to upload</Button>
        <img src={data?.data?.image} alt="image" className="h-50 mt-10" />
      </Upload>
    </Form>

    
  );
};
