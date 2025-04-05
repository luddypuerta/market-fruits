import { AppRouter } from "@/routes/AppRouter";
import { AppTheme } from "@/assets/theme";

export const App = () => {
    return (
        <AppTheme>
            <AppRouter/>
        </AppTheme>
    )
}
