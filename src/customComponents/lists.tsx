interface IProps {
  title: string;
  handler: () => void;
  data: any;
  isLoading: boolean;
  error: any;
}

export const Lists = (props: IProps) => {
  const { title, handler, data, isLoading } = props;
  console.log("data", data);

  console.log(data);

  const handlePrice = (price: number, title: string) => {
    if (title === "Orders") {
      return `$${price}`;
    }
  };

//   const handleName = (name: number, title: string) => {
//    if (title === "bundles") {
//      return `$${name}`;
//    }
//  };

  if (isLoading) return <>Loading....</>;
  return (
    <>
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            {title}
          </h5>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            View all
          </a>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {data?.length ? (
              data?.map((el: any, i: number) => {
                return (
                  <li className="py-3 sm:py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="w-8 h-8 rounded-full"
                          src={el?.image ?? ""}
                          alt="Neil image"
                        />
                      </div>
                      <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {el?.name ?? ""}
                          {/* {handleName(el?.name, title)} */}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {el?.email ?? ""}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          {el?._id ?? ""}
                        </p>
                      </div>
                      {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    {el?._id ?? ""}
                    </div> */}
                      <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                        {/* ${el?.price ?? ""} */}
                        {handlePrice(el?.price, title)}
                      </div>
                    </div>
                  </li>
                );
              })
            ) : (
              <>No records found</>
            )}
          </ul>
        </div>
      </div>

      {/* <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700 bg-white ">
        {data?.length ? (
          data?.map((el: any, i: number) => {
            return (
              <li className="pb-3 sm:pb-4">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="flex-shrink-0">
                    <img
                      className="w-8 h-8 rounded-full"
                      src={el?.image ?? ""}
                      alt="Neil image"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      {el?._id ?? ""}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      {el?.name ?? ""}
                    </p>
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    ${el?.price ?? ""}
                  </div>
                  <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                    ${el?.email ?? ""}
                  </div>
                </div>
              </li>
            );
          })
        ) : (
          <>No records found</>
        )}
      </ul> */}
    </>
  );
};
