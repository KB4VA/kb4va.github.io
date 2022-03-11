import React from 'react';
import {alpha, makeStyles, Paper} from "@material-ui/core";
import Image from "./Image";
import useView from "../hooks/useView";

const useStyles = makeStyles(theme => ({
    figImage: {
        height: '100%',
        // width: 'fit-content',
        maxWidth: '100%',
        position: 'relative',
    },
    figFile: {
        height: '100%',
        width: '100%',
    },
    box: {
        position: 'absolute',
        backgroundColor: alpha(theme.palette.secondary.main, 0.5),
    }
}));

function FigImage({viewId, onLoad, type = "fill", ...props}) {
    const classes = useStyles();

    const view = useView(viewId);

    const pos = (() => {
        const {x, y, width, height} = view.figBox;
        return {
            left: `${x * 100}%`,
            top: `${y * 100}%`,
            width: `${width * 100}%`,
            height: `${height * 100}%`,
        };
    })();

    return <Paper className={classes.figImage} elevation={4}>
        <Image src={view.figFile} alt={view.figFile}
                // view={view}
                // viewId={viewId}
                // verbose = {props.verbose}
               className={classes.figFile}
               onLoad={onLoad}
               type={type}
               overlay={<div className={classes.box} style={pos}/>}
               {...props}/>
    </Paper>
}

export default FigImage;
