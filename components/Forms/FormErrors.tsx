import classNames from "classnames";
import React from "react";
import styles from "./FormErrors.module.css";

interface FormErrorProps {
  errors?: string[];
  neutral?: boolean;
}
export const FormErrors: React.FC<FormErrorProps> = ({ errors, neutral }) => {
  return (
    <>
      {errors && (
        <div
          className={classNames(styles.formError)}
          style={{
            height: `${errors && errors.length * 20}px`,
            color: neutral ? `var(--neutral700)` : "red",
          }}
        >
          {errors?.map((error, i) => (
            <span key={i * Math.random()}>{error}</span>
          ))}
        </div>
      )}
    </>
  );
};
