interface IProps {
  data: any;
  isLoading: boolean;
  error: any;
  actions: any[];
}

export const CardWithButton = (props: IProps) => {
  const { error, data, isLoading, actions } = props;
  console.log(data, "Hii ");

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return <></>;
  }

  return (
    <div className="flex border border-inherit gap-4 items-center bg-white border-stroke rounded-lg">
      <div className="w-22 h-20 ">
        <img src={data?.image} alt="hi" />
      </div>
      <div className="mt-5 leading-8">
        <h2 className="font-bold text-black text-2xl ">{data?.name}</h2>
        <p>
          <b className="mr-1">Description:</b> {data?.description}
        </p>
        <div>
          <p>
            <b className="mr-1">Items:</b>
            {data?.products?.length}
            {data?.price && <b className="ml-5">Price:</b>}
            {data?.price && <> ${data?.price}</>}
          </p>
        </div>
      </div>
      <div className="cursor-pointer grid md:grid-cols-3 gap-4">
        {props.actions?.map((Component) => Component)}
      </div>
      {/* <div className="cursor-pointer" onClick={handler}>
        <FontAwesomeIcon icon={faPen} />
      </div> */}
    </div>
  );
};
