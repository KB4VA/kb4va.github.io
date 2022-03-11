import React from 'react';
import {Dialog, DialogContent, makeStyles, Tab, Tabs} from "@material-ui/core";
import {inject, observer} from "mobx-react";
import MuiVirtualizedTable from "./MuiVirtualizedTable";

const useStyles = makeStyles(theme => ({
    content: {
        height: 800,
        maxHeight: '80vh',
        display: 'flex',
    },
    tabPanel: {
        flex: 1,
        paddingLeft: theme.spacing(1),
    }
}));

function TableViewer({store}) {
    const classes = useStyles();

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const currentData = store.data[value];

    return <Dialog open={store.isTableViewerOpen}
                   onClose={store.closeTableViewer}
                   maxWidth="lg"
                   fullWidth>
        <DialogContent className={classes.content}>
            <Tabs orientation={"vertical"}
                  variant={"scrollable"}
                  value={value}
                  onChange={handleChange}
                  sx={{borderRight: 1, borderColor: 'divider'}}>
                {store.data.map(d => <Tab key={d.fileName} label={d.fileName}/>)}
            </Tabs>
            <div className={classes.tabPanel}>
                {currentData && <MuiVirtualizedTable rowCount={currentData.content.length}
                                                     rowGetter={({index}) => currentData.content[index]}
                                                     columns={currentData.fields.map(f => ({
                                                         width: 200,
                                                         label: f.name,
                                                         dataKey: f.name,
                                                     }))}/>}
            </div>
        </DialogContent>
    </Dialog>
}

export default inject('store')(observer(TableViewer));
