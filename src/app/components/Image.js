import React, {useRef, useState} from 'react';
import {makeStyles, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import clsx from "clsx";
import useImageSize from "../hooks/useImageSize";

const useStyles = makeStyles(theme => ({
    image: {
        overflow: 'hidden',
        width: '100%',
        height: '100%', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        flexWrap: 'wrap',
    },
    loading: {
        flex: '0 0 100%',
        width: '100%',
        textAlign: 'center',
        height: '100%',
        lineHeight: 10,
    },
    imgBlock: {
        position: 'relative',
        width: props => props.width || "100%",
        height: props => props.height || "100%",
    },
    img: {
        flex: '0 0 auto',
        width: props => props.width || "100%",
        height: props => props.height || "100%",
        transition: 'opacity .3s linear',
        "&$loaded": {
            opacity: 1,
        }
    },
    loaded: {},
}));

function Image({src, alt, className, onLoad, type = "fill", overlay, ...props}) {
    const [loaded, setLoaded] = useState(false);

    const cRef = useRef();
    const {width, height, loadedImage} = useImageSize(type, cRef);

    const classes = useStyles({width, height});
    return <div className={clsx(classes.image, className)}
                ref={cRef}>
        {!loaded && <Typography className={classes.loading}>loading</Typography>}
        <div className={classes.imgBlock}>
            <img src={src}
                 alt={alt}
                 draggable={false}
                 className={clsx(classes.img, {
                     [classes.loaded]: loaded
                 })}
                 onLoad={e => {
                     setLoaded(true);
                     loadedImage(e);
                     onLoad && onLoad(e);
                 }}
                 {...props}/>
            {overlay}
        </div>
    </div>
}

export default inject()(observer(Image));
