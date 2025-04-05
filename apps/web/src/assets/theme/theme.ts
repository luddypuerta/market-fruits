import { createTheme } from '@mui/material';


export const theme = createTheme({
    palette: {
        primary: {
            main: '#4E9334'
        },
        secondary: {
            main: '#EDF4EB'
        },
        error: {
            main: '#E50000'
        }
    },
    typography:{
        fontFamily:[
            'Rubik'
        ].join(',')
    },
    components: {
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    borderRadius: 8,
                    border: '3px solid #B4B4B4',
                    '&.Mui-focused': {
                        borderColor: '#4E9334',
                    },
                    '&.Mui-error': {
                        borderColor: '#E50000'
                    },
                    
                },
                underline: {
                    '&:hover:not(.Mui-disabled):before': {
                        borderBottom: 'none',
                    },
                    '&:before': {
                        borderBottom: 'none',
                    },
                    '&:after': {
                        borderBottom: 'none',
                    },
                    '&.Mui-disabled:after': {
                        borderBottom: 0,
                    },
                    '&.Mui-disabled:before': {
                        borderBottom: 0,
                    },
                }
            }
        },
        MuiSwitch: {
            styleOverrides: {
                root: {
                    padding: 8,
                    '& .MuiSwitch-track': {
                        borderRadius: 22 / 2,
                        '&::before, &::after': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: 16,
                        height: 16,
                        },
                    },
                    '& .MuiSwitch-thumb': {
                        boxShadow: 'none',
                        width: 16,
                        height: 16,
                        margin: 2,
                    },
                }
            }
        },
    },
})