import React from 'react';
import {Checkbox, ListItemText, ListSubheader, MenuItem, TextField, Typography} from "@material-ui/core";

function ItemSelect({title, value, onChange, options, twolevel=false}) {
    const val2label = val => {
        if (twolevel){
            let label = null
            Object.keys(options).forEach((key) => {
                if (label === null){
                    const idx = options[key].findIndex(option => option.value === val);
                    if (idx != -1) label = options[key][idx].label;
                }
            })
            if (label == null) return val; else return label
        }
        else{
            const idx = options.findIndex(option => option.value === val);
            if (idx === -1) return val;
            return options[idx].label;
        }
    }
    const wrapper = React.createRef();

    return <div ref={wrapper} style={{padding: '0px 15px 0px 10px'}}>
        {title && <Typography variant={"subtitle1"}>{title}</Typography>}
        <TextField select
                        SelectProps={{
                            multiple: true,
                            renderValue: selected => selected.map(val => val2label(val)).join(', '),
                        }}
                        style={{width: 200}}
                        value={value}
                        onChange={onChange}>
            {!twolevel && options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
                <Checkbox checked={value.includes(option.value)}/>
                <ListItemText primary={option.label}/>
            </MenuItem>
            ))}
            {twolevel && Object.keys(options).map((l1) => (
                    [<ListSubheader >{l1}</ListSubheader>,
                    options[l1].map((option) =>(
                        <MenuItem key={`${option.value}`} value={`${option.value}`}>
                            <Checkbox checked={value.includes(option.value)}/>
                            <ListItemText primary={option.label}/>
                        </MenuItem>))]
            ))}
        </TextField>
    </div>
}

export default React.memo(ItemSelect);
