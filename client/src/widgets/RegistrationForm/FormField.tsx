// components/RegistrationForm/FormField.tsx
import React from "react";
import styled from "styled-components";
import { theme } from "../styles/theme";

interface FormFieldProps {
  name: string;
  label: string;
  type: string;
  icon: string;
  placeholder: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
}

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

    &::placeholder {
      color: ${theme.colors.outline};
    }
  }
`;

const ErrorMessage = styled.span`
  display: block;
  font-size: ${theme.fontSize["label-sm"]};
  color: ${theme.colors.error};
  margin-top: ${theme.spacing.xs};
`;

const FormField: React.FC<FormFieldProps> = ({
  name,
  label,
  type,
  icon,
  placeholder,
  value,
  error,
  onChange,
  onBlur,
}) => {
  return (
    <FormGroup>
      <Label>{label}</Label>
      <InputWrapper $hasError={!!error}>
        <span className="material-symbols-outlined">{icon}</span>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      </InputWrapper>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormGroup>
  );
};

export default FormField;
