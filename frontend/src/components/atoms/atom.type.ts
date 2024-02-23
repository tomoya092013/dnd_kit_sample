export type ButtonType = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  variant: "primary" | "secondary" | "header" | "none";
};
