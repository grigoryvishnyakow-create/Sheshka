// App.tsx
import { useState, useEffect } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import BottomNavBar from "../widgets/NavMenu";
import TeachersPage from "../pages/TeachersPage";
import Shop from "../pages/Shop";
import History from "../pages/History";
import Dashboard from "../pages/Dashboard";
import Header from "../widgets/Header";
import RegistrationForm from "../widgets/RegistrationForm/RegistrationForm";
import LoginForm from "../widgets/RegistrationForm/LoginForm";
import { theme } from "../styles/theme";

export type TabId = "dashboard" | "history" | "teachers" | "shop";
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
  const handleNavigate = (tab: TabId) => {
    setActiveTab(tab);
  };

   // ПРОСТАЯ ПРОВЕРКА - ТОЛЬКО LOCALSTORAGE, БЕЗ ЗАПРОСА К API
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setBalance(user.points || 100);
        setAuthMode("authenticated");
      } catch (error) {
        console.error("Ошибка парсинга user:", error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // ФУНКЦИЯ ДЛЯ ЗАГРУЗКИ БАЛАНСА ИЗ БД
  const loadBalanceFromDB = async (userId: number) => {
    try {
      const response = await fetch(`/api/student/${userId}/balance`);
      const data = await response.json();
      
      if (data.success) {
        setBalance(data.points);
      }
    } catch (error) {
      console.error("Ошибка загрузки баланса:", error);
    }
  };

  // ПРИ ВХОДЕ - ЗАГРУЖАЕМ БАЛАНС ИЗ БД
  const handleLoginSuccess = async () => {
    const savedUser = localStorage.getItem('user');
    
    if (savedUser) {
      const user = JSON.parse(savedUser);
      await loadBalanceFromDB(user.id);
      setAuthMode("authenticated");
    } else {
      setAuthMode("authenticated");
    }
  };

  // ПРИ РЕГИСТРАЦИИ - БАЛАНС 100 УЖЕ В БД (БЕКЕНД УСТАНАВЛИВАЕТ 100)
  const handleRegisterSuccess = async () => {
    const savedUser = localStorage.getItem('user');
    
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setBalance(100); // ВРЕМЕННО ПОКАЗЫВАЕМ 100, ПОТОМ ПОДТВЕРДИМ ИЗ БД
      await loadBalanceFromDB(user.id); // ПОДТВЕРЖДАЕМ РЕАЛЬНЫЙ БАЛАНС ИЗ БД
      setAuthMode("authenticated");
    } else {
      setAuthMode("authenticated");
      setBalance(100);
    }
  };

  // ПРИ ВЫХОДЕ - ОЧИЩАЕМ
  const handleLogout = () => {
    localStorage.removeItem('user');
    setAuthMode("login");
    setBalance(0);
  };

  // ПРИ ЗАГРУЗКЕ АУТЕНТИФИЦИРОВАННОГО СОСТОЯНИЯ - ЗАГРУЖАЕМ БАЛАНС
  useEffect(() => {
    if (authMode === "authenticated") {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        const user = JSON.parse(savedUser);
        loadBalanceFromDB(user.id);
      }
    }
  }, [authMode]);

  const handleTabChange = (tabId: string) => {
    console.log("TAB:", tabId);
    setActiveTab(tabId as TabId);
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
{activeTab === "dashboard" && (
            <Dashboard balance={balance} onNavigate={handleNavigate} />
          )}
          {activeTab === "history" && <History />}
          {activeTab === "teachers" && <TeachersPage />}
          {activeTab === "shop" && <Shop />}
        </main>
        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </ThemeProvider>
  );
}

export default App;