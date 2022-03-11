import React from 'react';
import {Backdrop, CircularProgress, makeStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";

const useStyles = makeStyles(theme => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

function Waiting({store}) {
    const classes = useStyles();

    return <Backdrop className={classes.backdrop} open={store.waiting}>
        <CircularProgress color="inherit" />
    </Backdrop>
}

export default inject('store')(observer(Waiting));
