import {inject, observer} from "mobx-react";
import FigureViewer from "./views/FigureViewer";
import {AppBar, Button, makeStyles, Toolbar, Typography, useTheme} from "@material-ui/core";
import QueryPanel from "./views/QueryPanel";
import RecommendationsPanel from "./views/RecommendationsPanel";
import ViewList from "./views/ViewList";
import TableViewer from "./views/TableViewer";
import Panel from "./components/Panel";
import R from "../res";
import AspectRatioKeeper from "./components/AspectRatioKeeper";
import Waiting from "./components/Waiting";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100vw',
        height: '100vh',
        backgroundColor: theme.palette.primary.light,
    },
    content: {
        position: 'relative',
        width: '100vw',
        height: 'calc(100vh - 48px)',
    },
    flex: {
        flex: 1,
    }
}));

function App({store}) {
    const classes = useStyles();
    const theme = useTheme();

    return <div className={classes.root}>
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography variant="h5" color="inherit" component="div">{R.strings.systemName}</Typography>
                <div className={classes.flex}/>
                <Button color={"inherit"} onClick={store.importViews}>Load</Button>
                <Button color={"inherit"} onClick={store.exportViews}>Save</Button>
            </Toolbar>
        </AppBar>
        <div className={classes.content}>
            <AspectRatioKeeper ratio={1920 / 1032}>
                <Panel title="Query Panel"
                       pos={{
                           top: theme.spacing(1),
                           bottom: theme.spacing(1),
                           left: theme.spacing(1),
                           width: 500,
                       }}
                       bgColor={theme.palette.primary.light}>
                    <QueryPanel/>
                </Panel>
                <Panel title={`Retrieved Visualizations: ${store.recommendations.length} found`}
                       pos={{
                           top: theme.spacing(1),
                           bottom: `calc(${theme.spacing(2)}px + 30%)`,
                           left: theme.spacing(2) + 500,
                           right: theme.spacing(1),
                       }}
                       bgColor={theme.palette.primary.light}>
                    <RecommendationsPanel/>
                </Panel>
                <Panel title="Selected Visualizations"
                       pos={{
                           height: '30%',
                           bottom: theme.spacing(1),
                           left: theme.spacing(2) + 500,
                           right: theme.spacing(1),
                       }}>
                    <ViewList/>
                </Panel>
            </AspectRatioKeeper>
        </div>
        <FigureViewer/>
        {/* <TableViewer/> */}
        <Waiting/>
    </div>;
}

export default inject("store")(observer(App));
