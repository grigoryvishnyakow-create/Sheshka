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
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  const handleNavigate = (tab: TabId) => {
    setActiveTab(tab);
  };

  // ПРОСТАЯ ПРОВЕРКА - ТОЛЬКО LOCALSTORAGE, БЕЗ ЗАПРОСА К API
  useEffect(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        setBalance(user.points || 100);
        setCurrentUserId(user.id);
        setAuthMode("authenticated");
      } catch (error) {
        console.error("Ошибка парсинга user:", error);
        localStorage.removeItem("user");
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

  // ОБНОВЛЕНИЕ БАЛАНСА ПОСЛЕ ПОКУПКИ ИЛИ КВЕСТА
  const updateBalance = (newBalance: number) => {
    setBalance(newBalance);
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      user.points = newBalance;
      localStorage.setItem("user", JSON.stringify(user));
    }
  };

  // ПРИ ВХОДЕ - ЗАГРУЖАЕМ БАЛАНС ИЗ БД
  const handleLoginSuccess = async () => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUserId(user.id);
      await loadBalanceFromDB(user.id);
      setAuthMode("authenticated");
    } else {
      setAuthMode("authenticated");
    }
  };

  // ПРИ РЕГИСТРАЦИИ - БАЛАНС 100 УЖЕ В БД (БЕКЕНД УСТАНАВЛИВАЕТ 100)
  const handleRegisterSuccess = async () => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUserId(user.id);
      setBalance(100);
      await loadBalanceFromDB(user.id);
      setAuthMode("authenticated");
    } else {
      setAuthMode("authenticated");
      setBalance(100);
    }
  };

  // ПРИ ВЫХОДЕ - ОЧИЩАЕМ
  const handleLogout = () => {
    localStorage.removeItem("user");
    setCurrentUserId(null);
    setAuthMode("login");
    setBalance(0);
  };

  // ПРИ ЗАГРУЗКЕ АУТЕНТИФИЦИРОВАННОГО СОСТОЯНИЯ - ЗАГРУЖАЕМ БАЛАНС
  useEffect(() => {
    if (authMode === "authenticated") {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        const user = JSON.parse(savedUser);
        setCurrentUserId(user.id);
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

  // Handle case when currentUserId is null (loading state)
  if (currentUserId === null) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      <div>
        <Header 
          balance={balance} 
          onLogout={handleLogout}
          onLogoClick={() => setActiveTab("dashboard")}
        />
        <main>
          {activeTab === "dashboard" && (
            <Dashboard
              balance={balance}
              studentId={currentUserId}
              onNavigate={handleNavigate}
              onBalanceUpdate={updateBalance}
            />
          )}
          {activeTab === "history" && (
            <History
              studentId={currentUserId}
              onBalanceUpdate={updateBalance}
            />
          )}
          {activeTab === "teachers" && <TeachersPage />}
          {activeTab === "shop" && (
            <Shop
              studentId={currentUserId}
              onBalanceUpdate={updateBalance}
            />
          )}
        </main>
        <BottomNavBar activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    </ThemeProvider>
  );
}

export default App;