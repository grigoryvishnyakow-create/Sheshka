import React from "react";
import styled from "styled-components";

// Типы для пропсов
interface NavButtonProps {
  $isActive?: boolean;
}

interface Tab {
  id: string;
  icon: string;
  label: string;
}

interface BottomNavBarProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

// Основной контейнер навбара
const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 12px 8px;
  padding-bottom: env(safe-area-inset-bottom, 12px);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(247, 249, 252, 0.8);
  /* box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.08); */
  z-index: 50;
`;

const NavButton = styled.button<NavButtonProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4px 16px;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-bottom: 10px;

  background: ${({ $isActive }) => ($isActive ? "#94f991" : "transparent")};
  color: ${({ $isActive }) => ($isActive ? "#00751f" : "#414751")};
  border-radius: ${({ $isActive }) => ($isActive ? "16px" : "0")};
  transform: ${({ $isActive }) => ($isActive ? "scale(1.1)" : "scale(1)")};

  &:hover {
    color: ${({ $isActive }) => ($isActive ? "#00751f" : "#075fab")};
  }
`;

const Icon = styled.span.attrs({
  className: "material-symbols-outlined",
})`
  font-variation-settings:
    "FILL" 0,
    "wght" 400,
    "GRAD" 0,
    "opsz" 24;
  font-size: 24px;
  margin-bottom: 2px;
  user-select: none;
  background-color: transparent;
`;

const Label = styled.span`
  font-family: "Inter", sans-serif;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  user-select: none;
  background-color: transparent;
`;

const TABS: Tab[] = [
  { id: "dashboard", icon: "dashboard", label: "Главная" },
  { id: "history", icon: "account_balance", label: "О ВУЗ" },
  { id: "shop", icon: "shopping_cart", label: "Мерч" },
  { id: "profile", icon: "person", label: "Преподаватели" },
];
const BottomNavBar: React.FC<BottomNavBarProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <Nav role="navigation" aria-label="Main navigation">
      {TABS.map((tab) => (
        <NavButton
          key={tab.id}
          $isActive={activeTab === tab.id}
          onClick={() => onTabChange(tab.id)}
          aria-current={activeTab === tab.id ? "page" : undefined}
          aria-label={tab.label}
        >
          <Icon aria-hidden="true">{tab.icon}</Icon>
          <Label>{tab.label}</Label>
        </NavButton>
      ))}
    </Nav>
  );
};

export default BottomNavBar;
