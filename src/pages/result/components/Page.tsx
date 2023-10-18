import AppLayout from "../../../components/AppLayout";
import Chart from "./Chart";
import Score from "./Score";

const Page = () => {
  return (
    <AppLayout>
      <>
        <Chart />
        <Score />
      </>
    </AppLayout>
  );
};

export default Page;
