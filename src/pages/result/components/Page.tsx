import styled from "styled-components";
import AppLayout from "../../../components/AppLayout";
import Chart from "./Chart";
import IncorrectAnswerNote from "./IncorrectAnswerNote";
import Score from "./Score";
import TotalTime from "./TotalTime";
import Button from "../../../components/Button";
import { Link } from "react-router-dom";
import { PATH_ROOT } from "../../../constants/path";

const Page = () => {
  return (
    <AppLayout>
      <>
        <Title>퀴즈 결과</Title>
        <Chart />
        <Score />
        <TotalTime />
        <ButtonWrapper to={PATH_ROOT}>
          <Button label="다시 도전하기" />
        </ButtonWrapper>
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

const ButtonWrapper = styled(Link)`
  display: block;
  padding-top: 16px;
`;
