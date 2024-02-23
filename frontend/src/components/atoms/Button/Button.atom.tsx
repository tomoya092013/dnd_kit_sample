import clsx from "clsx";

import { ButtonType } from "../atom.type";

import styles from "./Button.module.scss";

export const Button = ({
  children,
  className,
  disabled = false,
  onClick,
  type = "button",
  variant = "primary",
}: ButtonType) => {
  return (
    <button
      className={clsx(styles[variant], className)}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
