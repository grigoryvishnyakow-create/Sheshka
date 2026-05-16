// components/LoginForm/LoginForm.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

interface LoginFormProps {
  onSuccess: () => void;
  onRegisterClick: () => void;
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
`;

const FormCard = styled.div`
  max-width: 400px;
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

const Form = styled.form`
  padding: ${theme.spacing.md};
`;

const FormGroup = styled.div`
  margin-bottom: ${theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  font-size: ${theme.fontSize["label-sm"]};
  font-weight: 500;
  color: ${theme.colors["on-surface-variant"]};
  margin-bottom: ${theme.spacing.xs};
`;

const InputWrapper = styled.div<{ $hasError?: boolean }>`
  position: relative;
  display: flex;
  align-items: center;

  span {
    position: absolute;
    left: ${theme.spacing.sm};
    color: ${theme.colors.outline};
    font-size: 20px;
  }

  input {
    width: 100%;
    padding: 14px ${theme.spacing.sm} 14px 44px;
    font-size: ${theme.fontSize["body-md"]};
    font-family: inherit;
    background: ${theme.colors["surface-container-low"]};
    border: 1.5px solid
      ${(props) =>
        props.$hasError ? theme.colors.error : theme.colors["outline-variant"]};
    border-radius: ${theme.borderRadius.DEFAULT};
    transition: all 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      background: ${theme.colors["surface-container-lowest"]};
    }
  }
`;

const ErrorMessage = styled.span`
  display: block;
  font-size: ${theme.fontSize["label-sm"]};
  color: ${theme.colors.error};
  margin-top: ${theme.spacing.xs};
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

const RegisterLink = styled.a`
  color: ${theme.colors.primary};
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ForgotPassword = styled.a`
  display: block;
  text-align: right;
  font-size: ${theme.fontSize["label-sm"]};
  color: ${theme.colors.primary};
  text-decoration: none;
  margin-top: ${theme.spacing.xs};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onRegisterClick,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";

    if (!password) newErrors.password = "Password is required";
    else if (password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Login:", { email, password });
      onSuccess();
    } catch (error) {
      setErrors({ email: "Invalid email or password" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <FormCard>
        <Header>
          <Logo>
            <LogoIcon>
              <span className="material-symbols-outlined">school</span>
            </LogoIcon>
            <LogoText>Sheshi</LogoText>
          </Logo>
          <Title>Welcome Back</Title>
        </Header>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email Address</Label>
            <InputWrapper $hasError={!!errors.email}>
              <span className="material-symbols-outlined">mail</span>
              <input
                type="email"
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputWrapper>
            {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <InputWrapper $hasError={!!errors.password}>
              <span className="material-symbols-outlined">lock</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputWrapper>
            {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
            <ForgotPassword>Forgot password?</ForgotPassword>
          </FormGroup>

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>Signing In...</>
            ) : (
              <>
                Sign In
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </SubmitButton>
        </Form>

        <Footer>
          <FooterText>
            Don't have an account?{" "}
            <RegisterLink onClick={onRegisterClick}>Sign Up</RegisterLink>
          </FooterText>
        </Footer>
      </FormCard>
    </Container>
  );
};

export default LoginForm;
