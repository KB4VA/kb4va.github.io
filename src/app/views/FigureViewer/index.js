import React from 'react';
import { Dialog, DialogContent, makeStyles, Typography} from "@material-ui/core";
import { useTheme } from '@material-ui/styles';
import { inject, observer } from "mobx-react";
import Editor from "@monaco-editor/react";
import FigImage from "../../components/FigImage";
import Image from "../../components/Image";
import useFigure from "../../hooks/useFigure";
import useView from "../../hooks/useView";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    figureViewer: {
        padding: 0,
        height: 800,
        maxHeight: '80vh',
        backgroundColor: theme.palette.primary.light,
        overflow: 'hidden',
        '&:first-child': {
            paddingTop: 0,
        }
    },
    top: {
        height: `calc(100% - ${200 + theme.spacing(3)}px)`,
        display: 'flex',
        margin: theme.spacing(1, 2),
        overflow: "hidden",
    },
    bigImage: {
        width: `calc(100% - ${500 + theme.spacing(3)}px)`,
        flex: `1 1 0`,
        overflow: 'hidden',
        padding: theme.spacing(1, 1, 1, 1),
    },
    viewImage: {
    },
    imageLimitation: {
        width: props => props.width,
        height: props => props.height,
    },
    spec: {
        height: `calc(100% - ${theme.spacing(1)}px)`,
        width: 300,
        flex: `0 0 500px`,
        padding: theme.spacing(2, 1, 1, 1),
        overflow: "hidden",
    },
    info: {
        height: `calc(100% - ${theme.spacing(1)}px)`,
        width: 200,
        flex: `0 0 350px`,
        padding: theme.spacing(1, 1, 1, 1),
        overflow: "hidden auto",
    },
    title: {
        height: '30px'
    },
    text: {
        '& + $title': {
            marginTop: theme.spacing(1),
        }
    },
    viewList: {
        flex: '0 0 200px',
        height: 200,
        display: 'flex',
        overflow: 'scroll hidden',
        paddingBottom: theme.spacing(1),
        margin: theme.spacing(0, 1)
    },
    view: {
        flex: '0 0 auto',
        margin: theme.spacing(0.5, 1),
    },
    selected: {
        boxShadow: `0 0 2px 2px ${theme.palette.primary.dark}`,
    }
}));

function FigureViewer({ store }) {
    const classes = useStyles();
    const theme = useTheme();

    const { title, caption, viewIds, selected, select } = useFigure(store.viewDetail);
    const view = useView(viewIds[selected]);
    
    const beautifyActionTarget = (actionTargets) =>{
        let atArray = []
        actionTargets.forEach((actionTarget) => {
            const action = actionTarget.replace("produce","produce-produce").split(":")[0].split("-")[1]
            const target = actionTarget.split(":")[1].split("-")[1]
            atArray.push(`${action} ${target}`)
        })
        return atArray.join(", ")
    }

    // console.log(viewIds[selected], selected)

    return <Dialog open={store.viewDetail !== null}
        onClose={store.closeViewDetail}
        maxWidth={"xl"}
        fullWidth>
        <DialogContent className={classes.figureViewer}>
            <div className={classes.top}>
                <div className={classes.bigImage}>
                    {/* <FigImage key={`bigimg-${viewIds[selected]}`} viewId={viewIds[selected]} type={"center"} /> */}
                    <Image className={classes.viewImage} src={view.viewFile} alt={view.viewFile} type={"center"}/>
                </div>
                <div className={classes.spec}>
                    <Typography className={classes.title} variant={"subtitle1"}>Specification</Typography>
                    <Editor
                        defaultLanguage="json"
                        options={{
                            lineNumbers: false,
                            readOnly: true,
                            background: theme.palette.primary.light,
                        }}
                        value={JSON.stringify(view.specification, null, 4)}
                        style={{height: '100%'}}
                    />
                </div>
                <div className={classes.info}>

                    <Typography className={classes.title} variant={"subtitle1"}>Title</Typography>
                    <Typography className={classes.text}
                        title={title}>{title}</Typography>

                    <Typography className={classes.title} variant={"subtitle1"}>Action-Target Pairs</Typography>
                    <Typography className={classes.text}
                        title={view.actionTargets.join(", ")}>{beautifyActionTarget(view.actionTargets)}</Typography>

                    <Typography className={classes.title} variant={"subtitle1"}>Compositions</Typography>
                    <Typography className={classes.text}
                        title={view.compositions.join(", ")}>{view.compositions.join(", ")}</Typography>

                    <Typography className={classes.title} variant={"subtitle1"}>Mark Types</Typography>
                    <Typography className={classes.text}
                        title={view.marks.join(", ")}>{view.marks.join(", ")}</Typography>


                    <Typography className={classes.title} variant={"subtitle1"}>Data Types</Typography>
                    <Typography className={classes.text}
                        title={view.dataTypes.join(", ")}>{view.dataTypes.join(", ")}</Typography>
                    <Typography className={classes.title} variant={"subtitle1"}>Channels</Typography>
                    <Typography className={classes.text}
                        title={view.channels.join(", ")}>{view.channels.join(", ")}</Typography>
                    
                    <Typography className={classes.title} variant={"subtitle1"}>Aggregates</Typography>
                    <Typography className={classes.text}
                        title={view.aggregates.join(", ")}>{view.aggregates.join(", ")}</Typography>

                    <Typography className={classes.title} variant={"subtitle1"}>Caption</Typography>
                    <Typography className={classes.text}
                        title={caption}>{caption}</Typography>
                </div>
            </div>
            <div className={classes.viewList}>
                {viewIds.map((viewId, vId) => <div key={viewId}
                    className={clsx(classes.view, {
                        [classes.selected]: vId === selected,
                    })}
                    onClick={() => select(vId)}>
                    <FigImage key={viewId} viewId={viewId} type={"fullHeight"} />
                </div>)}
            </div>
        </DialogContent>
    </Dialog>
}

export default inject('store')(observer(FigureViewer));
