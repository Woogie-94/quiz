import { ReactElement } from "react";
import styled from "styled-components";
import { DESKTOP_MOBILE_VIEW_WRAPPER_ID, SIZES } from "../constants";

const AppLayout = ({ children }: { children: ReactElement }) => {
  return (
    <Wrapper>
      <Inner id={DESKTOP_MOBILE_VIEW_WRAPPER_ID}>{children}</Inner>
    </Wrapper>
  );
};

export default AppLayout;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  background-color: #f4f4f7;
`;
const Inner = styled.div`
  width: 100%;
  min-height: 100vh;
  max-width: 576px;
  padding: 48px 32px;
  background-color: #fff;
  box-shadow: 0px 0px 20px #00000020;

  @media (max-width: ${SIZES.mobile}px) {
    padding: 24px 16px;
  }
`;
