import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { ReactNode } from "react"
import { theme } from "."


type AppThemeProps = {
    children: ReactNode
}

export const AppTheme = ( { children }: AppThemeProps ) => {
    return (
        <ThemeProvider theme={ theme }>
            <CssBaseline/>
            { children }
        </ThemeProvider>
    )
}