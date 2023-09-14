# VAID

## Basic Data Struture
### View Data
```{Javascript}
viewKnowledgeBase = [
    {
        "viewId": string (the unique id of the view),
        "viewFile": string,
        "dataType": string (formated representation of the data),
        "structuralData": string,
        "nonStructuralData": string,
        "taskType":[string],
        "figFile": string,
        "figCaption": string,
        "figBox":[], ## Bounding box of the view
        "figVis":[],
        "relationText": string (description of the selected tasks),
        "note": string (description of the data type)
    }
]
```
### Table Field
```{Javascript}
tableFieldData = [
    {
        "columnType": string (one of Q,N,T,O, and G),
        "columnName":[string],
        "analysisCount": int (the count of this field used for analysis),
    }
]
```

### Selected Views
The selected view data saves the view id, selectionId, corresponding column names, position in the canvas, selection source, and recommendation conditions.
Once a view is selected, a unique selectionId is generated and the view is placed to the canvas.
If the view is selected from detail information, the source would be "related", the recommendation condition would be empty, the corColumnName would be empty.
Else if the view is selected from View Recommendations, the source would be "query" and the recommendation condition would be that condition.
```{Javascript}
selectedViewData = [
    {
        "viewId": string,
        "selectionId": string,
        "corColumnName":[string],
        "posCanvas": [x,y,w,h],
        "source": string ("related" or "query"),
        "recCondition": {}
    }
]
```

### Detail Information
Detail information includes the information about the selected view and the views in that VA system.

### Recommendation Condition
Please ensure the aggregation of data types in selected columns is compatible with the data in dataStrcture.
```{Javascript}
recCondition = [
    {
        "columnNames": [string],
        "dataStructure": string,
        "taskType": [string],
        "visType": [string],
        "Structural": boolen,
        "Incremental": boolen,
    }
]
```

### View Recommendations
```{Javascript}
viewRecommendations = {
    "recConditions":{},
    "views":[{
            "viewId": string,
            "rankScore": num
        }]
}
```

### Detail Information
```{Javascript}
detailInformation = [
    {
        "viewId": string,
        "figFile": string,
        "dataType": string,
        "figVis": [],
        "figBox": [],
        "figCaption": string,
        "paperTitle":
        "viewList": [viewIds]
    }
]
```


## Backend
When the system is initiated, load the viewKnowledgeBase and init the table field, selected views, recommendation condition, and viewRecommendations.
### Table Reading
Read the table headers from a file.

### Query
input: recCondition, output: viewRecommendations.

## Interactions
### Generate recommendations


### Add a new view by Drag-and-Drop

### Open Detail Information View

### Add a new view by from Information View

### Set the Column Info


### Delete
