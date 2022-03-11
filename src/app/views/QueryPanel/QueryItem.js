import React from "react";
import {makeStyles, Typography} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    item: {
        width: '100%',
        display: "flex",
        flexWrap: 'wrap',
        margin: theme.spacing(0.5, 0),
        justifyContent: 'space-between'
    },
    solid: {
        flex: 0,
    },
    placeholder: {
        flexBasis: 0,
        flexGrow: 1,
        flexDirection: 'column',
    },
    shrinkable: {
        flexBasis: 'auto',
        flexShrink: 1,
        minHeight: 24,
        overflow: "hidden auto",
    },
    action: {
        justifyContent: 'center',
        flexWrap: 'nowrap',
    }
}))

function Item({
                  children,
                  solid = true,
                  placeholder = false,
                  shrinkable = false,
                  action = false,
                  title = null,
              }) {
    const classes = useStyles();

    return <div className={clsx(
      classes.item,
      {
          [classes.solid]: solid,
          [classes.placeholder]: placeholder,
          [classes.shrinkable]: shrinkable,
          [classes.action]: action,
      }
    )}>
        {title && <Typography variant={"subtitle1"}>{title}</Typography>}
        {children}
    </div>
}

export default Item;
