interface IProps {
  data: any;
  isLoading: boolean;
  error: any;
  actions: any[];
  showDetails?: boolean;
}

export const CardWithButton = (props: IProps) => {
  const { error, data, isLoading, actions, showDetails = true } = props;
  console.log(data, "Hii ");

  if (isLoading) {
    return <></>;
  }

  if (error) {
    return <></>;
  }

  return (
    <div className="flex border border-inherit gap-4 items-center bg-white border-stroke rounded-lg p-1 pl-0">
      <div className="w-16 h-20 min-w-16 items-center flex">
        <img src={data?.image} alt="hi" />
      </div>
      <div className="mt-5 leading-8 w-full">
        <div className="flex w-full justify-between items-center">
          <div className="relative w-full">
            <h2 className="font-bold text-black text-2xl whitespace-nowrap overflow-hidden w-5/6 text-ellipsis ">
              {data?.name}
            </h2>
            <p>
              <b className="mr-1">Description:</b> {data?.description}
            </p>
          </div>
          <div className="cursor-pointer flex gap-4 mr-1 ">
            {props.actions?.map((Component) => Component)}
          </div>
        </div>
        <div>
          {showDetails && (
            <p>
              <b className="mr-1">Items:</b>
              {data?.products?.length}
              {data?.price && <b className="ml-5">Price:</b>}
              {data?.price && <> ${data?.price}</>}

              {data?.weight && <b className="ml-5">Weight (in kg): </b>}
              {data?.weight && <> {data?.weight}</>}
            </p>
          )}
        </div>
      </div>

      {/* <div className="cursor-pointer" onClick={handler}>
        <FontAwesomeIcon icon={faPen} />
      </div> */}
    </div>
  );
};
