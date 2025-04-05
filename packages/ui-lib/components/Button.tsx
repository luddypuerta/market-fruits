import React from "react";
import ButtonMui from "@mui/material/Button";
import { ButtonProps as MuiButtonProps } from "@mui/material/Button";

interface ButtonProps {
  label: string;
  color?: MuiButtonProps["color"];
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, color = "primary", onClick }) => {
  return (
    <ButtonMui
      variant="contained"
      color={color as MuiButtonProps["color"]}
      onClick={onClick}
    >
      {label}
    </ButtonMui>
  );
};
