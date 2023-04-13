import classNames from "classnames";
import React from "react";
import styles from "./IconButton.module.css";
interface ButtonProps {
  icon: JSX.Element;
  label?: string | number | JSX.Element;
  onClick?: (e: any) => void;
  className?: string;
  href?: string;
  size?: "small";
  iconRight?: boolean;
  iconColor?: string;
  disabled?: boolean;
}

export const IconButton: React.FC<ButtonProps> = ({
  size,
  icon,
  label,
  onClick,
  iconRight,
  href,
  disabled,
}) => (
  <ion-button
    color={"tertiary"}
    class="{classNames(['icon-button', size === 'small' ? styles.textSmall : styles.textRegular])}"
    fill='clear'
    target='_self'
    disabled={disabled}
    href={href && href}
    onClick={onClick && onClick}
  >
    {!iconRight && icon}
    {label && (
      <div
        className={classNames(
          styles.label,
          iconRight ? styles.iconRight : styles.iconLeft
        )}
      >
        {label}
      </div>
    )}
    {iconRight && icon}
  </ion-button>
);
