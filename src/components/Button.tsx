import { ButtonHTMLAttributes, MouseEvent } from "react";
import styled, { keyframes } from "styled-components";

type ButtonHtmlAttributes = ButtonHTMLAttributes<HTMLButtonElement>;
interface Props extends Omit<ButtonHtmlAttributes, "type"> {
  label: string;
  loading?: boolean;
}

const Button = ({ label, loading, onClick, ...defaultProps }: Props) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (loading) {
      return;
    }

    onClick?.(e);
  };

  return (
    <BaseButton onClick={handleClick} {...defaultProps}>
      {loading && (
        <LoadingSpinner>
          <div />
          <div />
          <div />
        </LoadingSpinner>
      )}
      <Label $isVisible={!loading}>{label}</Label>
    </BaseButton>
  );
};

export default Button;

const BaseButton = styled.button<{ disabled?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px;
  background-color: #00c896;
  border-radius: 8px;
  transition: 0.2s;

  &:disabled {
    color: #3b3c42;
    background-color: #e0e0e0;
  }

  &:hover {
    &:not(:disabled) {
      background-color: #00bd8e;
    }
  }

  &:active {
    &:not(:disabled) {
      background-color: #00bd8e;
    }
  }
`;

const Label = styled.p<{ $isVisible: boolean }>`
  opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
  font-size: 16px;
  color: #fff;
`;

const spinAnimation = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }`;

const LoadingSpinner = styled.div<{ color?: string }>`
  position: absolute;

  & > div {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-radius: 50%;
    animation: ${spinAnimation} 0.8s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #fff transparent transparent transparent;

    &:nth-child(1) {
      animation-delay: -0.3s;
    }
    &:nth-child(2) {
      animation-delay: -0.2s;
    }
    &:nth-child(3) {
      animation-delay: -0.1s;
    }
  }
`;
