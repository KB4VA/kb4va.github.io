import React, {useState} from 'react';
import {Button, Checkbox, Input, makeStyles, MenuItem, Select, Typography} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import R from "../../../res";

const useStyles = makeStyles(theme => ({
    fieldCheckbox: {
        display: 'flex',
        width: '100%',
        alignItems: 'center',
    },
    text: {
        display: 'flex',
        flex: 1,
        overflow: 'hidden',
        border: `1px solid ${theme.palette.primary.main}`,
        borderRadius: theme.shape.borderRadius,
    },
    type: {
        margin: theme.spacing(0, 1),
        minWidth: 0,
        padding: theme.spacing(0, 1),
        flex: 0,
    },
    name: {},
    selectInput: {
        display: 'none',
    }
}));

function FieldCheckbox({
                           type,
                           name,
                           editable,
                           checked,
                           onChange,
                           onChangeType,
                       }) {
    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = e => onChangeType(name, e.target.value);

    return <div className={classes.fieldCheckbox}>
        <div className={classes.text}>
            <Button className={classes.type} variant={"text"} size={"small"}
                    onClick={handleOpen}>
                {type}
            </Button>
            <Typography className={classes.name} noWrap>#{name}</Typography>
        </div>
        <Checkbox color="primary"
                  disabled={!editable}
                  checked={checked && editable}
                  onChange={onChange}/>
        <Select open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={type}
                input={<Input className={classes.selectInput}/>}
                onChange={handleChange}>
            {R.const.fieldTypes.map(fT => <MenuItem key={fT.value} value={fT.value}>{fT.label}</MenuItem>)}
        </Select>
    </div>
}

export default inject()(observer(FieldCheckbox));
