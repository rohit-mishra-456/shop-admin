import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "antd";

interface ICardProps {
  title: string;
  count: number;
  icon: any;
  handler: () => void;
}

const Card = (props: ICardProps) => {
  const { title, count, icon, handler } = props;

  return (
    <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex justify-between">
        <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
          <FontAwesomeIcon color="#3C50E0" icon={icon} />
        </div>

        <span className="flex items-center gap-1 text-sm font-medium cursor-pointer">
          <a className=" btn btn-primary text-blue-800" onClick={handler}>
            View All
          </a>
        </span>

      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white">
            {count}
          </h4>
          <span className="text-sm font-medium text-black">{title}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
