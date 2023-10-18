import AppLayout from "../../../components/AppLayout";
import Chart from "./Chart";
import Score from "./Score";
import TotalTime from "./TotalTime";

const Page = () => {
  return (
    <AppLayout>
      <>
        <Chart />
        <Score />
        <TotalTime />
      </>
    </AppLayout>
  );
};

export default Page;
