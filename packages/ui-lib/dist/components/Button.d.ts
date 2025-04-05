import React from "react";
import { ButtonProps as MuiButtonProps } from "@mui/material/Button";
interface ButtonProps {
    label: string;
    color?: MuiButtonProps["color"];
    onClick?: () => void;
}
export declare const Button: React.FC<ButtonProps>;
export {};
//# sourceMappingURL=Button.d.ts.map