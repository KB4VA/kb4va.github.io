import React, {useRef} from 'react';
import {makeStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import Recommendation from "./Recommendation";
import {useSize} from "ahooks";

const useStyles = makeStyles(theme => ({
    recommendationsPanel: {
        overflow: "hidden scroll",
        width: '100%',
        height: '100%',
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(1),
        display: 'grid',
        gridTemplateColumns: props => `repeat(${Math.floor((props.width - theme.spacing(2)) / (300 + theme.spacing(2)))}, 1fr)`,
        gridTemplateRows: `repeat(auto-fill, 200px)`,
        gap: theme.spacing(2),
        justifyContent: "space-evenly",
    },
}));

function RecommendationsPanel({store}) {
    const cRef = useRef();
    const {width} = useSize(cRef);

    const classes = useStyles({width});

    return <div className={classes.recommendationsPanel} ref={cRef}>
        {store.recommendations.map(rec => <Recommendation key={rec.viewId}
                                                          rec={rec}/>)}
    </div>
}

export default inject('store')(observer(RecommendationsPanel));
