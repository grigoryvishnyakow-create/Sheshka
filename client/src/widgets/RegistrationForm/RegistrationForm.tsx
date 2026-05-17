// components/RegistrationForm/RegistrationForm.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";
import FormField from "./FormField";
import SuccessScreen from "./SuccessScreen";

interface RegistrationFormProps {
  onSuccess: () => void;
  onLoginClick: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeTerms?: string;
}

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

  @media (min-width: 768px) {
    padding: ${theme.spacing.lg};
  }
`;

const FormCard = styled.div`
  max-width: 480px;
  width: 100%;
  background: ${theme.colors["surface-container-lowest"]};
  border-radius: ${theme.borderRadius.DEFAULT};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  overflow: hidden;
`;

const Header = styled.div`
  padding: ${theme.spacing.md};
  text-align: center;
  border-bottom: 1px solid ${theme.colors["outline-variant"]};
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.sm};
`;

const LogoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: ${theme.colors["primary-container"]};
  border-radius: ${theme.borderRadius.DEFAULT};
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    color: ${theme.colors["on-primary-container"]};
    font-size: 24px;
  }
`;

const LogoText = styled.h1`
  font-size: ${theme.fontSize["headline-md"]};
  font-weight: 700;
  color: ${theme.colors.primary};
`;

const Title = styled.h2`
  font-size: ${theme.fontSize["headline-lg"]};
  font-weight: 600;
  color: ${theme.colors["on-surface"]};
  margin-bottom: ${theme.spacing.xs};
`;

const Subtitle = styled.p`
  font-size: ${theme.fontSize["body-md"]};
  color: ${theme.colors["on-surface-variant"]};
`;

const Form = styled.form`
  padding: ${theme.spacing.md};
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${theme.spacing.sm};
`;

const CheckboxGroup = styled.label`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  cursor: pointer;
  margin: ${theme.spacing.md} 0;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  accent-color: ${theme.colors.secondary};
  cursor: pointer;
`;

const CheckboxLabel = styled.span`
  font-size: ${theme.fontSize["body-sm"]};
  color: ${theme.colors["on-surface-variant"]};
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 16px;
  background: ${theme.colors.primary};
  color: ${theme.colors["on-primary"]};
  font-size: ${theme.fontSize["label-md"]};
  font-weight: 600;
  font-family: inherit;
  border: none;
  border-radius: ${theme.borderRadius.full};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};

  &:hover {
    opacity: 0.9;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Footer = styled.div`
  padding: ${theme.spacing.md};
  text-align: center;
  border-top: 1px solid ${theme.colors["outline-variant"]};
  background: ${theme.colors["surface-container-low"]};
`;

const FooterText = styled.p`
  font-size: ${theme.fontSize["body-sm"]};
  color: ${theme.colors["on-surface-variant"]};
`;

const LoginLink = styled.a`
  color: ${theme.colors.primary};
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ScoreBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  background: ${theme.colors["secondary-container"]};
  padding: 6px 12px;
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.fontSize["label-sm"]};
  font-weight: 500;
  color: ${theme.colors["on-secondary-container"]};
  margin-bottom: ${theme.spacing.sm};

  span {
    font-size: 16px;
  }
`;

const ErrorMessage = styled.span`
  display: block;
  font-size: ${theme.fontSize["label-sm"]};
  color: ${theme.colors.error};
  margin-top: ${theme.spacing.xs};
  text-align: center;
`;

// КОМПОНЕНТ ДЛЯ ОТОБРАЖЕНИЯ ТРЕБОВАНИЙ К ПАРОЛЮ
const PasswordRequirements = styled.div`
  font-size: ${theme.fontSize["label-sm"]};
  color: ${theme.colors["on-surface-variant"]};
  margin-top: ${theme.spacing.xs};
  padding-left: ${theme.spacing.sm};
  
  ul {
    margin-top: 4px;
    padding-left: 20px;
  }
  
  li {
    margin-bottom: 2px;
  }
  
  .valid {
    color: ${theme.colors.secondary};
  }
  
  .invalid {
    color: ${theme.colors.error};
  }
`;

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSuccess,
  onLoginClick,
}) => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // ФУНКЦИЯ ДЛЯ ПРОВЕРКИ ТРЕБОВАНИЙ К ПАРОЛЮ
  const getPasswordRequirements = (password: string) => {
    return {
      minLength: password.length >= 6,
      hasLetter: /[A-Za-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
    };
  };

  const passwordRequirements = getPasswordRequirements(formData.password);

const validateField = (
  name: string,
  value: string | boolean,
): string | undefined => {
  switch (name) {
    case "firstName":
      if (!value) return "Требуется имя";
      if (typeof value === "string" && value.length < 2)
        return "Имя должно содержать не менее 2 символов";
      return undefined;
    case "lastName":
      if (!value) return "Требуется фамилия";
      if (typeof value === "string" && value.length < 2)
        return "Фамилия должна содержать не менее 2 символов";
      return undefined;
    case "email":
      if (!value) return "Требуется электронная почта";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value as string))
        return "Введите корректный email адрес";
      return undefined;
    case "password":
      if (!value) return "Требуется пароль";
      if (typeof value === "string") {
        if (value.length < 6) return "Пароль должен содержать не менее 6 символов";
        if (!/[A-Za-z]/.test(value)) return "Пароль должен содержать хотя бы одну букву";
        if (!/[0-9]/.test(value)) return "Пароль должен содержать хотя бы одну цифру";
      }
      return undefined;
    case "confirmPassword":
      if (!value) return "Подтвердите пароль";
      if (value !== formData.password) return "Пароли не совпадают";
      return undefined;
    case "agreeTerms":
      if (!value) return "Вы должны согласиться с условиями";
      return undefined;
    default:
      return undefined;
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    const error = validateField(name, newValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
    setSubmitError(null);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;
    const error = validateField(name, fieldValue);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof FormData];
      const error = validateField(key, value);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          patronymic: "",
          email: formData.email,
          password: formData.password,
          agreeTerms: formData.agreeTerms
        })
      });

      const data = await response.json();
      
      if (!data.success) {
        if (data.error === 'invalid_password') {
          setSubmitError("Пароль должен содержать буквы и цифры (минимум 6 символов)");
        } else if (data.error === 'email_exists') {
          setSubmitError("Этот email уже зарегистрирован. Пожалуйста, войдите.");
        } else {
          throw new Error(data.message);
        }
        return;
      }
      localStorage.setItem('user', JSON.stringify(data.student));
      
      setShowSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (error) {
      setSubmitError("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return <SuccessScreen />;
  }

  return (
    <Container>
      <FormCard>
        <Header>
          <ScoreBadge>
            <span>Присоединись и получи 100</span>
            <span className="material-symbols-outlined">eco</span>
          </ScoreBadge>
          <Logo>
            <LogoIcon>
              <span className="material-symbols-outlined">school</span>
            </LogoIcon>
            <LogoText>Шешка</LogoText>
          </Logo>
          <Title>Создать аккаунт</Title>
          <Subtitle>Присоединяйся к нашему университету и обучайся с интерактивом!</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Row>
            <FormField
              name="firstName"
              label="Имя"
              type="text"
              icon="person"
              placeholder="Введите имя"
              value={formData.firstName}
              error={errors.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormField
              name="lastName"
              label="Фамилия"
              type="text"
              icon="badge"
              placeholder="Введите фамилию"
              value={formData.lastName}
              error={errors.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Row>

          <FormField
            name="email"
            label="Адрес электронной почты"
            type="email"
            icon="mail"
            placeholder="student@ya.ru"
            value={formData.email}
            error={errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Row>
            <FormField
              name="password"
              label="Пароль"
              type="password"
              icon="lock"
              placeholder="Создайте пароль"
              value={formData.password}
              error={errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormField
              name="confirmPassword"
              label="Подтвердите пароль"
              type="password"
              icon="verified"
              placeholder="Ваш пароль"
              value={formData.confirmPassword}
              error={errors.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Row>

          {/* ОТОБРАЖЕНИЕ ТРЕБОВАНИЙ К ПАРОЛЮ */}
          {formData.password && !passwordRequirements.minLength && (
            <PasswordRequirements>
              Требования к паролю:
              <ul>
                <li className={passwordRequirements.minLength ? "valid" : "invalid"}>
                  ✓ Не менее 6 символов
                </li>
                <li className={passwordRequirements.hasLetter ? "valid" : "invalid"}>
                  ✓ Содержать хотя бы одну букву (A-Z, a-z)
                </li>
                <li className={passwordRequirements.hasNumber ? "valid" : "invalid"}>
                  ✓ Хотя бы одна цифра (0-9)
                </li>
              </ul>
            </PasswordRequirements>
          )}

          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <CheckboxLabel>
              Я согласен с <strong>Условиями пользования</strong> и{" "}
              <strong>Политикой конфидециальности</strong>
            </CheckboxLabel>
          </CheckboxGroup>
          {errors.agreeTerms && (
            <ErrorMessage>{errors.agreeTerms}</ErrorMessage>
          )}
          {submitError && <ErrorMessage>{submitError}</ErrorMessage>}

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>Шешкуемся!...</>
            ) : (
              <>
                Создать аккаунт
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </SubmitButton>
        </Form>

        <Footer>
          <FooterText>
            У вас уже есть аккаунт  ?{" "}
            <LoginLink onClick={onLoginClick}>Войти</LoginLink>
          </FooterText>
        </Footer>
      </FormCard>
    </Container>
  );
};

export default RegistrationForm;