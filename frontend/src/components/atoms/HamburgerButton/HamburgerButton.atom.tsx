import clsx from "clsx";
import styles from "./HamburgerButton.module.scss";

type Props = {
  onOpen: boolean;
};

export const HamburgerButton = ({ onOpen }: Props) => {
  return (
    <button className="relative w-12 h-8">
      <span
        className={clsx([styles.line, styles.top, onOpen && styles.onOpen])}
      ></span>
      <span
        className={clsx([styles.line, styles.middle, onOpen && styles.onOpen])}
      ></span>
      <span
        className={clsx([styles.line, styles.bottom, onOpen && styles.onOpen])}
      ></span>
    </button>
  );
};
