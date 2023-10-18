import styled from "styled-components";
import AppLayout from "../../../components/AppLayout";
import Chart from "./Chart";
import IncorrectAnswerNote from "./IncorrectAnswerNote";
import Score from "./Score";
import TotalTime from "./TotalTime";

const Page = () => {
  return (
    <AppLayout>
      <>
        <Title>퀴즈 결과</Title>
        <Chart />
        <Score />
        <TotalTime />
        <IncorrectAnswerNote />
      </>
    </AppLayout>
  );
};

export default Page;

const Title = styled.h2`
  font-weight: bold;
  font-size: 24px;
  color: #424242;
`;
