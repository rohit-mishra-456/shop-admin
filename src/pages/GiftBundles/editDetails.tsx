import { useGetGiftBundleByIdQuery } from "../../queries/giftBundle"


export const editDetails = () => {

    const {data, isLoading, error} = useGetGiftBundleByIdQuery("65a61c540b0c8cf2704d6362");
    console.log(data, "Edit");

  return (
    <div >
        <div>{data?.data?.name}</div>
        <div>{data?.data?.description}</div>
        <div>
            <img src={data?.data?.image} className="h-10" />
        </div>
    </div>

    // <>
    // <form>
    //     <label>Name</label>
    // <input type="text">{data?.data?.name}</input>
    // </form>
    // </>
  )
}
