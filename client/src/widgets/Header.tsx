// widgets/Header.tsx (обновленный)
import React from "react";
import styled from "styled-components";
import { theme } from "../widgets/styles/theme";

interface HeaderProps {
  balance: number;
  onLogout?: () => void;
}

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 50;
  backdrop-filter: blur(12px);
  background: ${theme.colors.surface} / 80;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${theme.spacing["margin-mobile"]};
  height: 64px;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const MenuButton = styled.button`
  color: ${theme.colors.primary};
  transition: opacity 0.2s;
  cursor: pointer;
  background: none;
  border: none;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    transform: scale(0.95);
  }
`;

const Logo = styled.span`
  font-size: ${theme.fontSize["headline-md"]};
  font-weight: 700;
  color: ${theme.colors.primary};
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
`;

const BalanceBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: ${theme.colors["secondary-container"]} / 30;
  padding: 4px 12px;
  border-radius: ${theme.borderRadius.full};
`;

const BalanceIcon = styled.span`
  color: ${theme.colors.secondary};
  font-size: 18px;
`;

const BalanceText = styled.span`
  font-size: ${theme.fontSize["label-md"]};
  font-weight: 600;
  color: ${theme.colors["on-secondary-container"]};
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors["on-surface-variant"]};
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: ${theme.borderRadius.full};
  transition: all 0.2s;

  &:hover {
    background: ${theme.colors["surface-container-high"]};
    color: ${theme.colors.error};
  }
`;

const Header: React.FC<HeaderProps> = ({ balance, onLogout }) => {
  return (
    <HeaderContainer>
      <LogoSection>
        <MenuButton>
          <span className="material-symbols-outlined">menu</span>
        </MenuButton>
        <Logo>Sheshi</Logo>
      </LogoSection>
      <RightSection>
        <BalanceBadge>
          <BalanceIcon
            className="material-symbols-outlined"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            eco
          </BalanceIcon>
          <BalanceText>{balance}</BalanceText>
        </BalanceBadge>
        {onLogout && (
          <LogoutButton onClick={onLogout} title="Logout">
            <span className="material-symbols-outlined">logout</span>
          </LogoutButton>
        )}
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
