import React from 'react';
import {makeStyles, Paper, Popover, Tooltip, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import ActionBox from "../../components/ActionBox";
import {InfoOutlined, Loupe, Star, StarHalf} from "@material-ui/icons";
import useView from "../../hooks/useView";
import Image from "../../components/Image";

const useStyles = makeStyles(theme => ({
    recommendation: {
        minWidth: 300,
        width: '100%',
        height: 200,
        backgroundColor: theme.palette.background.default,
        display: 'flex',
        padding: theme.spacing(1, 0.5, 1, 1),
    },
    image: {
        flex: '1 1 0',
        width: 0,
    },
    imagePreview: {
        maxHeight: '60vh',
        maxWidth: '60vw',
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
        width: '30vw',
        textAlign: "center",
    },
    popoverText: {
        textAlign: 'left',
    },
    info: {
        flex: '1 1 0',
        width: 0,
        margin: theme.spacing(1, 1, 1, 0.5),
        overflow: 'hidden auto',
    },
    title: {
        verticalAlign: 'Bottom',
        display: 'inline-flex',
    },
    icon: {
        fontSize: '1.25rem',
        margin: `4px 2px`,
    },
    text: {
        marginLeft: 24,
        '& + $title': {
            marginTop: theme.spacing(1),
        }
    },
}));


function Recommendation({rec, store}) {
    const classes = useStyles();

    const view = useView(rec.viewId);

    const handleDragStart = (ev) => {
        ev.dataTransfer.setData("viewId", rec.viewId);
        ev.dataTransfer.dropEffect = "copy";
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return <ActionBox actions={[
        {
            icon: <Loupe/>, click: e => {
                e.preventDefault();
                store.showViewDetail(view.figId, view.viewId)
            }
        }
    ]}>
        <Paper elevation={4} className={classes.recommendation} draggable onDragStart={handleDragStart}>
            <Image src={view.viewFile} alt={view.viewFile} className={classes.image}
                   onMouseEnter={handlePopoverOpen}
                   onMouseLeave={handlePopoverClose}/>
            <Popover className={classes.popover}
                     classes={{paper: classes.paper}}
                     open={open}
                     anchorEl={anchorEl}
                     anchorOrigin={{
                         vertical: 'bottom',
                         horizontal: 'center',
                     }}
                     transformOrigin={{
                         vertical: 'top',
                         horizontal: 'center',
                     }}
                     onClose={handlePopoverClose}
                     disableRestoreFocus>
                <img className={classes.imagePreview} src={view.viewFile} alt={view.viewFile}/>
            </Popover>
        </Paper>
    </ActionBox>
}

export default inject('store')(observer(Recommendation));
