import React, { useCallback, useState } from "react";
import { EyeIcon, EyeOffIcon } from "../Icons";
import { FormErrors } from "./FormErrors";
import styles from "./FormFields.module.css";
import { IconButton } from "./IconButton";

interface InputProps<T> {
  placeholder?: string;
  name?: string;
  type?: "text" | "number" | "password" | "email" | "color";
  label?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  onPaste?: (e: any) => void;
  autoComplete?: string;
  errors?: string[];
  color?: string;
  disabled?: boolean;
  width?: string;
  gap?: number;
  value?: T;
  inputRef?: React.RefObject<HTMLInputElement>;
  id?: string;
  step?: string;
  tabIndex?: number;
}

export function Input<T extends string | number>({
  placeholder,
  name,
  value,
  type,
  label,
  onChange,
  onBlur,
  onPaste,
  tabIndex,
  autoComplete,
  disabled,
  errors,
  color,
  width,
  id,
  step,
  inputRef,
}: InputProps<T>): JSX.Element {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const unmaskPassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const fieldType = useCallback(() => {
    if (type === "password") {
      if (passwordVisible) {
        return "text";
      } else {
        return "password";
      }
    } else {
      return type ? type : "text";
    }
  }, [passwordVisible, type]);

  return (
    <div
      className={styles.fieldHolder}
      style={{ width: width ? width : "100%" }}
    >
      {label && <div className={styles.label}>{label}</div>}
      {type === "password" && (
        <div className={styles.fieldIcon}>
          <IconButton
            size='small'
            icon={passwordVisible ? <EyeOffIcon /> : <EyeIcon />}
            onClick={unmaskPassword}
          />
        </div>
      )}

      <input
        style={{
          color: errors && errors.length > 0 ? "red" : color,
          paddingRight: type === "password" ? "45px" : "0px",
        }}
        tabIndex={tabIndex}
        className={styles.input}
        id={id && id}
        placeholder={placeholder ? placeholder : "Placeholder"}
        name={name && name}
        type={fieldType()}
        step={step ? step : undefined}
        value={value}
        // step={step ? step : undefined}
        onBlur={onBlur && onBlur}
        onKeyDown={(e) => {
          e.key === "Enter" && onBlur && onBlur(e);
        }}
        onChange={onChange && onChange}
        onPaste={onPaste && onPaste}
        ref={inputRef}
        autoComplete={autoComplete ? autoComplete : "off"}
      ></input>
      <FormErrors errors={errors} />
    </div>
  );
}
