import React from 'react';
import {Grid, Switch, Typography} from "@material-ui/core";

function DualSwitch({left, right, ...props}) {
    return <Typography component="div" noWrap>
        <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>{left}</Grid>
            <Grid item>
                <Switch color={"primary"} {...props}/>
            </Grid>
            <Grid item>{right}</Grid>
        </Grid>
    </Typography>
}

export default React.memo(DualSwitch);
