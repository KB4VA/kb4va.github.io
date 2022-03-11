import {alpha, darken, lighten} from "@material-ui/core";
const primaryColor = "rgb(20, 90, 140)";
const scrollColor = "rgb(36, 40, 41)";
const theme = {
    palette: {
        primary: {
            light: 'rgb(239, 250, 254)',
            main: 'rgb(212, 231, 245)',
            dark: primaryColor,
        },
        background: {
            default: 'rgb(239, 250, 254)',
        }
    },
    props: {
        MuiAppBar: {
            elevation: 1,
        }
    },
    overrides: {
        MuiAppBar: {
            colorPrimary: {
                backgroundColor: primaryColor,
                color: '#ffffff',
            },
        },
        MuiTypography: {
            subtitle1: {
                fontWeight: 'bold'
            }
        },
        MuiCheckbox: {
            colorPrimary: {
                color: alpha(primaryColor, 0.5),
                "&$checked": {
                    color: primaryColor,
                }
            }
        },
        MuiSwitch: {
            colorPrimary: {
                "&$checked": {
                    color: primaryColor,
                }
            }
        },
        MuiTooltip: {
            tooltip: {
                maxWidth: 500,
                fontSize: '1.25rem',
                whiteSpace: 'pre-line',
            }
        },
        MuiCssBaseline: {
            '@global': {
                '*::-webkit-scrollbar': {
                    width: 10,
                    height: 10,
                },
                '*::-webkit-scrollbar-track': {
                    display: 'none',
                },
                '*::-webkit-scrollbar-corner': {
                    display: 'none',
                },
                '*::-webkit-scrollbar-thumb': {
                    backgroundColor: alpha(scrollColor, 0.1),
                    borderRadius: 10,
                },
                '*:hover::-webkit-scrollbar-thumb': {
                    backgroundColor: lighten(scrollColor, 0.2),
                },
                '*::-webkit-scrollbar-thumb:hover': {
                    backgroundColor: scrollColor,
                },
                '*::-webkit-scrollbar-thumb:active': {
                    backgroundColor: darken(scrollColor, 0.2),
                }
            }
        }
    },
    spacing: 10,
}

export default theme;
