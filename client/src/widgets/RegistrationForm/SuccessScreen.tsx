// components/RegistrationForm/SuccessScreen.tsx
import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

const Container = styled.div`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing["margin-mobile"]};
  background: linear-gradient(
    135deg,
    ${theme.colors.background} 0%,
    ${theme.colors["surface-container"]} 100%
  );
`;

const FormCard = styled.div`
  max-width: 480px;
  width: 100%;
  background: ${theme.colors["surface-container-lowest"]};
  border-radius: ${theme.borderRadius.DEFAULT};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  text-align: center;
  padding: 48px 24px;
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: ${theme.colors["secondary-container"]};
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 24px;

  span {
    font-size: 48px;
    color: ${theme.colors.secondary};
  }
`;

const Title = styled.h2`
  font-size: ${theme.fontSize["headline-lg"]};
  font-weight: 600;
  color: ${theme.colors["on-surface"]};
  margin-bottom: ${theme.spacing.sm};
`;

const Message = styled.p`
  font-size: ${theme.fontSize["body-md"]};
  color: ${theme.colors["on-surface-variant"]};
  margin-bottom: ${theme.spacing.md};
`;

const SuccessScreen: React.FC = () => {
  return (
    <Container>
      <FormCard>
        <SuccessIcon>
          <span className="material-symbols-outlined">check_circle</span>
        </SuccessIcon>
        <Title>Welcome to Sheshi!</Title>
        <Message>
          Your account has been successfully created! Redirecting to
          dashboard...
        </Message>
        <div style={{ marginTop: 24 }}>
          <div
            style={{
              width: "100%",
              height: 4,
              background: theme.colors["outline-variant"],
              borderRadius: theme.borderRadius.full,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: theme.colors.secondary,
                borderRadius: theme.borderRadius.full,
                animation: "progress 2s linear",
              }}
            />
          </div>
        </div>
        <style>{`
          @keyframes progress {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}</style>
      </FormCard>
    </Container>
  );
};

export default SuccessScreen;
