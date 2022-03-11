import React, {useRef} from 'react';
import {makeStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import {useSize} from "ahooks";

const useStyles = makeStyles(theme => ({
    outerArea: {
        position: 'relative',
        width: '100%',
        height: '100%',
    },
    innerContainer: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    },
}));

function getMaxBox(width, height, ratio) {
    if (!width || !height || !ratio) return [0, 0];

    if (height * ratio > width) return [width, width / ratio];
    else return [height * ratio, height];
}

function AspectRatioKeeper({ratio, children}) {
    const classes = useStyles();
    const rootRef = useRef();
    const {width, height} = useSize(rootRef);

    const [ctnW, ctnH] = getMaxBox(width, height, ratio);

    return <div className={classes.outerArea}
                ref={rootRef}>
        <div className={classes.innerContainer}
             style={{
                 width: ctnW,
                 height: ctnH,
             }}>
            {children}
        </div>
    </div>
}

export default inject()(observer(AspectRatioKeeper));
