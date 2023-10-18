import styled from "styled-components";
import { useResultPresenterContext } from "../presenter/Result.presenter";

const TotalTime = () => {
  const { result } = useResultPresenterContext();

  return (
    <Wrapper>
      <Title>총 소요 시간</Title>
      <Time>{result?.totalElapsedTime}</Time>
    </Wrapper>
  );
};

export default TotalTime;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 24px 16px;
  margin-top: 8px;
`;
const Title = styled.p`
  font-size: 16px;
  color: #424242;
`;
const Time = styled.p`
  font-weight: bold;
  font-size: 18px;
  color: #424242;
`;
