import React from "react";
import Button, { ButtonProps } from ".";
export interface ButtonPrimaryProps extends ButtonProps {
  href?: any;
  className?: string;
}

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`rounded-full bg-primary text-white hover:bg-primary/80 disabled:bg-opacity-70 ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
