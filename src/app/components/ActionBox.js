import React from 'react';
import {IconButton, makeStyles} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    actionBox: {
        position: 'relative',
        "&:hover > $actions": {
            opacity: 1,
        }
    },
    actions: {
        position: 'absolute',
        right: 0,
        top: 0,
        maxWidth: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        opacity: 0,
        transition: 'opacity .3s linear',
    },
    action: {
        flex: 0,
        margin: theme.spacing(0.5),
    }
}));

function ActionBox({actions, className, children}) {
    const classes = useStyles();

    return <div className={clsx(classes.actionBox, className)}>
        {children}
        <div className={classes.actions}>
            {actions.map((action, aId) => <div key={aId} className={classes.action}>
                <IconButton size={"small"} onClick={action.click}>
                    {action.icon}
                </IconButton>
            </div>)}
        </div>
    </div>
}

export default ActionBox;
