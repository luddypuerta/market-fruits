import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import ButtonMui from "@mui/material/Button";
export const Button = ({ label, color = "primary", onClick }) => {
    return (_jsx(ButtonMui, { variant: "contained", color: color, onClick: onClick, children: label }));
};
