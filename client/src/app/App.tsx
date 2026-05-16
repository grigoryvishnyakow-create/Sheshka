// App.tsx
import { useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import BottomNavBar from "../widgets/NavMenu";
import Profile from "../pages/Profile";
import Shop from "../pages/Shop";
import History from "../pages/History";
import Dashboard from "../pages/Dashboard";
import Header from "../widgets/Header";
import RegistrationForm from "../widgets/RegistrationForm/RegistrationForm";
import LoginForm from "../widgets/RegistrationForm/LoginForm";
import { theme } from "../widgets/styles/theme";

type TabId = "dashboard" | "history" | "teachers" | "shop";
type AuthMode = "login" | "register" | "authenticated";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: ${theme.colors.background};
    color: ${theme.colors["on-surface"]};
    min-height: 100dvh;
  }

  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
    font-family: 'Material Symbols Outlined';
    font-weight: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
  }
`;

function App() {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [balance, setBalance] = useState(0);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as TabId);
  };

  const handleLoginSuccess = () => {
    setAuthMode("authenticated");
    setBalance(540); // Set initial balance after login
  };

  const handleRegisterSuccess = () => {
    setAuthMode("authenticated");
    setBalance(100); // New users get 100 bonus points
  };

  const handleLogout = () => {
    setAuthMode("login");
    setBalance(0);
  };

  const handleShowRegister = () => {
    setAuthMode("register");
  };

  const handleShowLogin = () => {
    setAuthMode("login");
  };

  // Show auth screens if not authenticated
  if (authMode === "login") {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <LoginForm
          onSuccess={handleLoginSuccess}
          onRegisterClick={handleShowRegister}
        />
      </ThemeProvider>
    );
  }

  if (authMode === "register") {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <RegistrationForm
          onSuccess={handleRegisterSuccess}
          onLoginClick={handleShowLogin}
        />
      </ThemeProvider>
    );
  }

  // Authenticated state - show main app
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <div>
        <Header balance={balance} onLogout={handleLogout} />
        <main>
          {activeTab === "dashboard" && <Dashboard balance={balance} />}
          {activeTab === "history" && <History />}
          {activeTab === "teachers" && <Profile />}
          {activeTab === "shop" && <Shop />}
        </main>
        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </ThemeProvider>
  );
}

export default App;
