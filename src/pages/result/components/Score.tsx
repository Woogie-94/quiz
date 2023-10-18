import styled from "styled-components";
import { useResultPresenterContext } from "../presenter/Result.presenter";

const Score = () => {
  const { result } = useResultPresenterContext();

  return (
    <Wrapper>
      <TopWrapper>
        <Title>총 결과</Title>
        <CountWrapper>
          <CorrectCount>{result?.correctCount}개</CorrectCount>

          <TotalCount>/ {result?.questions.length}개</TotalCount>
        </CountWrapper>
      </TopWrapper>
      <BottomWrapper>
        <LineWrapper>
          <LineText>정답 {result?.correctCount}개</LineText>
          <BlockWrapper>
            {new Array(result?.correctCount).fill(undefined).map((_, index) => (
              <CountBlock key={index} $isCorrect />
            ))}
          </BlockWrapper>
        </LineWrapper>
        <LineWrapper>
          <LineText>오답 {result?.incorrectCount}개</LineText>
          <BlockWrapper>
            {new Array(result?.incorrectCount).fill(undefined).map((_, index) => (
              <CountBlock key={index} />
            ))}
          </BlockWrapper>
        </LineWrapper>
      </BottomWrapper>
    </Wrapper>
  );
};

export default Score;

const Wrapper = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 24px 16px;
`;
const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #e0e0e0;
`;
const Title = styled.p`
  font-size: 16px;
  color: #424242;
`;
const CountWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
const CorrectCount = styled.p`
  font-weight: bold;
  font-size: 18px;
  color: #424242;
`;
const TotalCount = styled.p`
  font-size: bold;
  font-size: 18px;
  color: #9e9e9e;
`;
const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-top: 16px;
`;
const LineWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LineText = styled.p`
  font-size: 16px;
  color: #9e9e9e;
`;
const BlockWrapper = styled.div`
  display: flex;
  gap: 4px;
`;
const CountBlock = styled.div<{ $isCorrect?: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 4px;
  background-color: ${({ $isCorrect }) => ($isCorrect ? "#add8e6" : "#ff4d4d")};
`;
