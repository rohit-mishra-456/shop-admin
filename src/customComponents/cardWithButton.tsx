interface IProps {
  data: any,
  isLoading: boolean,
  error: any,
}
 
export const CardWithButton = (props: IProps) => {
 
  const { error, data, isLoading } = props;
 
  if (isLoading) {
    return <></>
  }
 
  if (error) {
    return <></>
  }
 
 
  return (
    <div>
      <div>
        <img src={data?.image} alt="hi" />
      </div>
      <div>
        {data?.name}
        {data?.description}
        {data?.price}
        {data?.products?.length}
      </div>
      <div></div>
    </div>
  );
}
 
// export default CardWithButton;