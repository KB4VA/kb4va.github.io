import React from 'react';
import {makeStyles} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import {Close, Loupe} from "@material-ui/icons";
import ActionBox from "../../components/ActionBox";
import FigImage from "../../components/FigImage";

const useStyles = makeStyles(theme => ({
    view: {
        height: "100%",
        backgroundColor: theme.palette.background.default,
        margin: theme.spacing(0, 0, 0, 1),
        flex: '0 0 auto',
    },
}));

function View({viewId, onViewDetail, onRemove}) {
    const classes = useStyles();

    return <ActionBox className={classes.view}
                      actions={[
                        {
                            icon: <Loupe/>, click: e => {
                                e.preventDefault();
                                onViewDetail();
                            }
                        },
                        {
                            icon: <Close color={"secondary"}/>, click: e => {
                                e.preventDefault();
                                onRemove();
                            }
                        }
                    ]}>
        <FigImage viewId={viewId} type={"fullHeight"}/>
    </ActionBox>
}

export default inject()(observer(View));
