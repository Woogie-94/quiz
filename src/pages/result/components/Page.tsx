import AppLayout from "../../../components/AppLayout";
import Chart from "./Chart";
import IncorrectAnswerNote from "./IncorrectAnswerNote";
import Score from "./Score";
import TotalTime from "./TotalTime";

const Page = () => {
  return (
    <AppLayout>
      <>
        <Chart />
        <Score />
        <TotalTime />
        <IncorrectAnswerNote />
      </>
    </AppLayout>
  );
};

export default Page;
