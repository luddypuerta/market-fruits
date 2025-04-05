import { jsx as _jsx } from "react/jsx-runtime";
import { AppRouter } from "@/routes/AppRouter";
import { AppTheme } from "@/assets/theme";
export const App = () => {
    return (_jsx(AppTheme, { children: _jsx(AppRouter, {}) }));
};
