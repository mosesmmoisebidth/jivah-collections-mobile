import React from "react";
import Button, { ButtonProps } from ".";

export interface ButtonSecondaryProps extends ButtonProps {
  href?: any;
  className?: string;
}

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`rounded-full border-primary border  hover:bg-primary/10 disabled:bg-opacity-70 ${className}`}
      {...args}
    />
  );
};

export default ButtonSecondary;
