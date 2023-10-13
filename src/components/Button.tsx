import { ButtonHTMLAttributes } from "react";
import styled, { keyframes } from "styled-components";

type ButtonHtmlAttributes = ButtonHTMLAttributes<HTMLButtonElement>;
interface Props extends Omit<ButtonHtmlAttributes, "type"> {
  label: string;
  loading?: boolean;
}

const Button = ({ label, loading, ...defaultProps }: Props) => {
  return (
    <BaseButton {...defaultProps}>
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
  font-size: 14px;
  color: #fff;
  background-color: #5a41f5;
  border-radius: 8px;
  transition: 0.2s;

  &:disabled {
    color: #3b3c42;
    background-color: #f4f4f7;
  }

  &:hover {
    &:not(:disabled) {
      background-color: #513bdd;
    }
  }

  &:active {
    &:not(:disabled) {
      background-color: #513bdd;
    }
  }
`;

const Label = styled.p<{ $isVisible: boolean }>`
  opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
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
