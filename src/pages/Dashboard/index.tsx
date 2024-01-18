import { LatestStats } from "./latestStats.tsx";
import { TopCards } from "./topCards.tsx";

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <TopCards />
      </div>

      <div className="mt-4 grid gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <LatestStats />
      </div>
    </>
  );
};

export default Dashboard;
