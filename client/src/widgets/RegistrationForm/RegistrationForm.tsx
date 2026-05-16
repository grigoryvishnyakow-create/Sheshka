// components/RegistrationForm/RegistrationForm.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";
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
  studentId: string;
  agreeTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  studentId?: string;
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
    studentId: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateField = (
    name: string,
    value: string | boolean,
  ): string | undefined => {
    switch (name) {
      case "firstName":
        if (!value) return "First name is required";
        if (typeof value === "string" && value.length < 2)
          return "Name must be at least 2 characters";
        return undefined;
      case "lastName":
        if (!value) return "Last name is required";
        if (typeof value === "string" && value.length < 2)
          return "Name must be at least 2 characters";
        return undefined;
      case "email":
        if (!value) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value as string))
          return "Please enter a valid email address";
        return undefined;
      case "password":
        if (!value) return "Password is required";
        if ((value as string).length < 8)
          return "Password must be at least 8 characters";
        return undefined;
      case "confirmPassword":
        if (!value) return "Please confirm your password";
        if (value !== formData.password) return "Passwords do not match";
        return undefined;
      case "studentId":
        if (!value) return "Student ID is required";
        return undefined;
      case "agreeTerms":
        if (!value) return "You must agree to the terms";
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

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Registration data:", formData);
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
            <span className="material-symbols-outlined">eco</span>
            <span>Join & Earn 100</span>
          </ScoreBadge>
          <Logo>
            <LogoIcon>
              <span className="material-symbols-outlined">school</span>
            </LogoIcon>
            <LogoText>Sheshi</LogoText>
          </Logo>
          <Title>Create Account</Title>
          <Subtitle>Join the Sheshi community and start earning</Subtitle>
        </Header>

        <Form onSubmit={handleSubmit}>
          <Row>
            <FormField
              name="firstName"
              label="First Name"
              type="text"
              icon="person"
              placeholder="Enter your first name"
              value={formData.firstName}
              error={errors.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormField
              name="lastName"
              label="Last Name"
              type="text"
              icon="badge"
              placeholder="Enter your last name"
              value={formData.lastName}
              error={errors.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Row>

          <FormField
            name="studentId"
            label="Student ID"
            type="text"
            icon="credit_card"
            placeholder="e.g., SH-2024-XXXX"
            value={formData.studentId}
            error={errors.studentId}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <FormField
            name="email"
            label="Email Address"
            type="email"
            icon="mail"
            placeholder="student@university.edu"
            value={formData.email}
            error={errors.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <Row>
            <FormField
              name="password"
              label="Password"
              type="password"
              icon="lock"
              placeholder="Create a password"
              value={formData.password}
              error={errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <FormField
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              icon="verified"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              error={errors.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Row>

          <CheckboxGroup>
            <Checkbox
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
            />
            <CheckboxLabel>
              I agree to the <strong>Terms of Service</strong> and{" "}
              <strong>Privacy Policy</strong>
            </CheckboxLabel>
          </CheckboxGroup>
          {errors.agreeTerms && (
            <ErrorMessage>{errors.agreeTerms}</ErrorMessage>
          )}
          {submitError && <ErrorMessage>{submitError}</ErrorMessage>}

          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>Creating Account...</>
            ) : (
              <>
                Create Account
                <span className="material-symbols-outlined">arrow_forward</span>
              </>
            )}
          </SubmitButton>
        </Form>

        <Footer>
          <FooterText>
            Already have an account?{" "}
            <LoginLink onClick={onLoginClick}>Sign In</LoginLink>
          </FooterText>
        </Footer>
      </FormCard>
    </Container>
  );
};

export default RegistrationForm;
