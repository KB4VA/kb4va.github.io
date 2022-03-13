import React from 'react';
import {Button, makeStyles, TextField, Tooltip, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import QueryItem from "./QueryItem";
import {Refresh} from "@material-ui/icons";
import DualSwitch from "./DualSwitch";
import R from "../../../res";
import ItemSelect from "./ItemSelect";
import FieldCheckbox from "./FieldCheckbox";
import SpecInput from "./SpecInput"

const useStyles = makeStyles(theme => ({
    queryPanel: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
    },
    itemContainer:{
        height: '30vh',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'start'
    }
}));

function QueryPanel({store}) {
    const classes = useStyles();

    return <div className={classes.queryPanel}>
        <QueryItem title={"Filters"}>
            <div className={classes.itemContainer}>
                <ItemSelect title={"Task: Action"}
                            value={store.queryParams.actions}
                            onChange={e => store.setQueryParams({actions: e.target.value})}
                            options={R.const.actions}
                            twolevel/>
                <ItemSelect title={"Task: Target"}
                            value={store.queryParams.targets}
                            onChange={e => store.setQueryParams({targets: e.target.value})}
                            options={R.const.targets}
                            twolevel/>
                <ItemSelect title={"Composition"}
                            value={store.queryParams.compositions}
                            onChange={e => store.setQueryParams({compositions: e.target.value})}
                            options={R.const.compositions}/>
                <ItemSelect title={"Visualization"}
                            value={store.queryParams.marks}
                            onChange={e => store.setQueryParams({marks: e.target.value})}
                            options={R.const.marks.sort((a, b) => (a.label > b.label) ? 1 : -1)}/>
                <ItemSelect title={"Visual Channel"}
                            value={store.queryParams.channels}
                            onChange={e => store.setQueryParams({channels: e.target.value})}
                            options={R.const.channels}/>
                <ItemSelect title={"Data Type"}
                            value={store.queryParams.dataTypes}
                            onChange={e => store.setQueryParams({dataTypes: e.target.value})}
                            options={R.const.dataTypes}/>
                {/* <ItemSelect title={"Aggregate"}
                            value={store.queryParams.aggregates}
                            onChange={e => store.setQueryParams({aggregates: e.target.value})}
                            options={R.const.aggregates}/> */}
            </div>
        </QueryItem>
        
        <QueryItem title={"JSON Specification"}>
            <SpecInput />
        </QueryItem>

        <QueryItem placeholder/>
        <QueryItem action>
            <Button variant={"outlined"} onClick={() => {
                store.generateRecommendationsFromQueryParams();
            }}>Search</Button>
        </QueryItem>
        <QueryItem action>
            <Button variant={"text"} endIcon={<Refresh/>} onClick={store.resetQueryParams}>Reset</Button>
        </QueryItem>
    </div>
}

export default inject("store")(observer(QueryPanel));
