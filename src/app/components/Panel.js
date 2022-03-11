import React from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";

const useStyles = makeStyles(theme => ({
    panel: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
    },
    title: {
        margin: '4px auto 4px 10px'
    },
    content: {
        position: 'absolute',
        top: 40,
        bottom: theme.spacing(1),
        left: theme.spacing(1),
        right: theme.spacing(1),
        overflow: 'hidden',
    }
}));

function Panel({title, pos, children}) {
    const classes = useStyles();

    return <div className={classes.panel}
                style={pos}>
        <Typography variant={"h6"}
                    className={classes.title}>{title}</Typography>
        <div className={classes.content}>
            {children}
        </div>
    </div>
}

export default inject()(observer(Panel));
