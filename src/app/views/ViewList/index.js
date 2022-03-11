import React from 'react';
import {makeStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import View from "./View";

const useStyles = makeStyles(theme => ({
    viewList: {
        overflow: "scroll hidden",
        width: '100%',
        height: '100%',
        paddingTop: theme.spacing(0.5),
        paddingBottom: theme.spacing(1),
        display: 'flex',
    },
}));

function ViewList({store}) {
    const classes = useStyles();

    const handleDragOver = ev => ev.preventDefault(); // preventDefault to allow drop
    const handleDrop = (ev) => {
        ev.preventDefault();
        const viewId = ev.dataTransfer.getData("viewId");
        store.selectView(viewId);
    }

    return <div className={classes.viewList}
                onDragOver={handleDragOver} onDrop={handleDrop}>
        {store.selectedViews.map(view => <View key={view.viewId}
                                               viewId={view.viewId}
                                               onViewDetail={() => store.showViewDetail(view.figId, view.viewId)}
                                               onRemove={() => store.removeView(view.viewId)}/>)}
    </div>
}

export default inject('store')(observer(ViewList));
