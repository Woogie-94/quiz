import { ReactElement, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DESKTOP_MOBILE_VIEW_WRAPPER_ID, SIZES } from "../constants";

interface Props {
  children: ReactElement;
}

const FixedBottom = ({ children }: Props) => {
  const [left, setLeft] = useState<number>();
  const [width, setWidth] = useState<number>();
  const [fixedWrapperHeight, setFixedWrapperHeight] = useState(0);
  const fixedWrapperRef = useRef<HTMLDivElement>(null);

  const setPosition = () => {
    const wrapper = document.getElementById(DESKTOP_MOBILE_VIEW_WRAPPER_ID);

    if (wrapper) {
      const { x, width } = wrapper?.getBoundingClientRect() || {};

      setLeft(x);
      setWidth(width);
    } else {
      setLeft(undefined);
      setWidth(undefined);
    }
  };

  useEffect(() => {
    setPosition();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", setPosition);
    return () => {
      window.removeEventListener("resize", setPosition);
    };
  }, []);

  useEffect(() => {
    if (!fixedWrapperRef.current) {
      return;
    }
    setFixedWrapperHeight(fixedWrapperRef.current.getBoundingClientRect().height);
  }, []);

  return (
    <>
      <Spacing $height={fixedWrapperHeight} />
      <FixedWrapper ref={fixedWrapperRef} $width={width} $left={left}>
        <Wrapper>{children}</Wrapper>
      </FixedWrapper>
    </>
  );
};

export default FixedBottom;

const FixedWrapper = styled.div<{ $width?: number; $left?: number }>`
  position: fixed;
  width: ${({ $width }) => ($width ? `${$width}px` : "100%")};
  left: ${({ $left }) => ($left ? `${$left}px` : "0")};
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding: 16px 32px;
  background: linear-gradient(180deg, #ffffff00 0%, #ffffff 21.99%, #ffffff 100%);

  @media (max-width: ${SIZES.mobile}px) {
    padding: 16px;
  }
`;

const Spacing = styled.div<{ $height: number }>`
  width: 100%;
  height: ${({ $height }) => `${$height}px`};
`;
