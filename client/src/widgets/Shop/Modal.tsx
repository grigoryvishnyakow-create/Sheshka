// widgets/Shop/Modal.tsx
import React, { useEffect } from "react";
import styled from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type: "success" | "error" | "warning";
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContainer = styled.div<{ $type: string }>`
  background: white;
  border-radius: 24px;
  padding: 32px;
  max-width: 400px;
  width: 90%;
  text-align: center;
  animation: slideUp 0.3s ease;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border-top: 6px solid
    ${({ $type }) =>
      $type === "success"
        ? "#006e1d"
        : $type === "error"
        ? "#ba1a1a"
        : "#ff9800"};

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const IconWrapper = styled.div<{ $type: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${({ $type }) =>
    $type === "success"
      ? "rgba(0, 110, 29, 0.1)"
      : $type === "error"
      ? "rgba(186, 26, 26, 0.1)"
      : "rgba(255, 152, 0, 0.1)"};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;

  span {
    font-size: 48px;
    color: ${({ $type }) =>
      $type === "success"
        ? "#006e1d"
        : $type === "error"
        ? "#ba1a1a"
        : "#ff9800"};
  }
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  color: #191c1e;
`;

const Message = styled.p`
  font-size: 16px;
  color: #414751;
  margin-bottom: 24px;
  line-height: 1.5;
`;

const CloseButton = styled.button<{ $type: string }>`
  background: ${({ $type }) =>
    $type === "success"
      ? "#006e1d"
      : $type === "error"
      ? "#ba1a1a"
      : "#ff9800"};
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, type }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return "check_circle";
      case "error":
        return "error";
      case "warning":
        return "warning";
      default:
        return "info";
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalContainer $type={type} onClick={(e) => e.stopPropagation()}>
        <IconWrapper $type={type}>
          <span className="material-symbols-outlined">{getIcon()}</span>
        </IconWrapper>
        <Title>{title}</Title>
        <Message>{message}</Message>
        <CloseButton $type={type} onClick={onClose}>
          Закрыть
        </CloseButton>
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;