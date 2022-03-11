import React from "react";
import {Switch, FormControlLabel } from '@material-ui/core';
import {inject, observer} from "mobx-react";
import Editor from "@monaco-editor/react";

function SpecInput({store}) {

  const inputChange = (newValue, event) => {
    store.setSpecInter(newValue)
    // store.setQueryParams({vegaSpec: e.target.value})
  }

  const options = {
    selectOnLineNumbers: true,
    // readOnly: true
  };

  return (
    <div style={{display: 'block', width: '100%'}}>
      <FormControlLabel
          control={<Switch 
            checked={store.queryParams.useSpec}
            onChange={(e) => store.setQueryParams({useSpec: e.target.checked})}
            color="primary" 
            name="search by specification" />}
          label="Use Specification"
          style={{padding: "10px"}}
        />
    <Editor
      height="30vh"
      defaultLanguage="json"
      options={options}
      onChange={inputChange}
      value={store.vegaSpecInter}
      defaultValue={JSON.stringify({
        "x": {
            "type":"*"
        },
        "y": {
            "type":"*"
        }
    }, null, 4)}
    />
    </div>
  );
}

export default inject("store")(observer(SpecInput));
