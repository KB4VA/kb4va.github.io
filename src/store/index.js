import { makeAutoObservable } from "mobx";
import Papa from "papaparse";
import inferColumnTypeFromData from "../utils/inferColumnTypeFromData";
import queryRecommendations from "../utils/queryRecommendations";
import generateDataStructureFromFields from "../utils/generateDataStructureFromFields";
import { queryViewById } from "../database/views";
import { queryFigureById } from "../database/figures";
import { saveAs } from 'file-saver';

class Store {
    constructor() {
        makeAutoObservable(this);
        window.onbeforeunload = (e) => {
            e.preventDefault();
            console.error(e);
        }
        window.onunload = e => {
            e.preventDefault();
            console.error(e);
        }
        this.generateRecommendationsFromQueryParams();
    }

    waiting = false;
    startWait = () => this.waiting = true;
    endWait = () => this.waiting = false;

    data = [];
    uploadData = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".csv";
        input.multiple = true;
        input.onchange = () => {
            const handleData = file => new Promise(resolve => {
                Papa.parse(file, {
                    header: true,
                    complete: res => {
                        res.errors.forEach(err => {
                            if (err.code === "TooFewFields" && err.row === res.data.length - 1) // the last line is empty
                                res.data.pop();
                        });
                        resolve({
                            fileName: file.name,
                            fields: res.meta.fields.map(f => ({
                                type: inferColumnTypeFromData(res.data.map(d => d[f]), f),
                                name: f,
                            })),
                            content: res.data,
                        });
                    }
                })
            });
            const files = input.files;
            const fileHandlers = [...new Array(files.length)].map((_, fId) => handleData(files[fId]));

            Promise.all(fileHandlers)
                .then(res => {
                    this.resetQueryParams();
                    this.setData(res);

                    const fields = [];
                    const fieldNames = [];
                    res.map(res => res.fields)
                        .flat()
                        .forEach(field => {
                            if (fieldNames.includes(field.name)) return;
                            fields.push(field);
                            fieldNames.push(field.name);
                        })
                    this.setFields(fields);
                })
        }
        input.click();
    }
    setData = newData => this.data = newData;

    fields = [];
    setFields = newFields => this.fields = newFields;
    setFieldType = (field, type) => this.fields.forEach(f => (f.name === field) && (f.type = type));

    isTableViewerOpen = false;
    showTableViewer = () => this.isTableViewerOpen = true;
    closeTableViewer = () => this.isTableViewerOpen = false;


    
    vegaSpecInter = JSON.stringify({
        "x": {
            "type":"*"
        },
        "y": {
            "type":"*"
        }
    }, null, 4);
    // vegaSpecInter = JSON.stringify({facet: {},spec:{
    //     "mark": "bar",
    //     "encoding": {
    //         "x": "*"
    //     }
    // }}, null, 4);

    setSpecInter = (newValue) => {
        this.vegaSpecInter = newValue
    }

    queryParams = {
        fields: [],
        isNonStructural: true,
        dataStructure: "",
        actions: [],
        targets: [],
        compositions: [],
        marks: [],
        channels: [],
        dataTypes: [],
        aggregates: [],
        useSpec: false,
        specification: {}

    }
    setQueryParams = newParams => {
        this.queryParams = { ...this.queryParams, ...newParams };
        if (this.queryParams.isNonStructural)
            this.queryParams.dataStructure = generateDataStructureFromFields(
                this.queryParams.fields,
                this.fields,
            )
    }
    resetQueryParams = () => {
        this.setQueryParams({
            fields: [],
            isNonStructural: true,
            dataStructure: "",
            actions: [],
            targets: [],
            compositions: [],
            marks: [],
            channels: [],
            dataTypes: [],
            aggregates: [],
            useSpec: false,
            specification: {}
        })
        this.vegaSpecInter = JSON.stringify({
            "x": {
                "type":"*"
            },
            "y": {
                "type":"*"
            }
        }, null, 4);
        this.generateRecommendationsFromQueryParams();
    }

    views = {};
    getViewData = viewId => new Promise(resolve => {
        if (this.views[viewId]) {
            resolve(this.views[viewId]);
            return;
        }

        queryViewById(viewId)
            .then(res => {
                this.views[viewId] = res;
                resolve(res);
            })
    })

    recommendations = [];
    setRecommendations = newRecommendations => this.recommendations = newRecommendations;
    generateRecommendationsFromQueryParams = () => {
        this.startWait();
        const condition = {
            "actions": this.queryParams.actions,
            "targets": this.queryParams.targets,
            "compositions": this.queryParams.compositions,
            "marks": this.queryParams.marks,
            "channels": this.queryParams.channels,
            "datas": this.queryParams.dataTypes,
            "aggregates": this.queryParams.aggregates
        };
        if (this.queryParams.useSpec) {
            try {
                condition.specification = JSON.parse(this.vegaSpecInter);
            } catch (e) {
                condition.specification = this.queryParams.specification
            }
        }
        else{
            condition.specification = this.queryParams.specification
        }
        // console.log(condition)
        queryRecommendations(condition).then(res => {
            this.endWait();
            // console.log(res)
            // res.sort((a, b) => b.rankScore.sum - a.rankScore.sum);
            this.setRecommendations(res.slice(0, 48).map(d => ({ ...d, condition })));
        })
    }

    viewDetail = null;
    showViewDetail = (figId, initViewId) => this.viewDetail = { figId, initViewId };
    closeViewDetail = () => this.viewDetail = null;

    selectedViews = [];
    selectView = viewId => {
        this.getViewData(viewId)
            .then(view => {
                let condition = this.recommendations.find(rec => rec.viewId === viewId).condition;
                this.selectedViews.push({
                    viewId,
                    figId: view.figId,
                    viewFile: view.viewFile,
                    // layout: JSON.parse(JSON.stringify(view.figBox)),
                    condition,
                });
            })
    }
    setViews = newViews => this.selectedViews = newViews;
    removeView = viewId => this.selectedViews = this.selectedViews.filter(v => v.viewId !== viewId);
    // changePos = (viewId, newPos) => {
    //     console.log(viewId, newPos);
    //     this.selectedViews.forEach(v => {
    //         if (v.viewId !== viewId) return;
    //         v.layout = {...v.layout, ...newPos};
    //     })
    // };
    // exportLayout = () => {
    //     Promise.all(this.selectedViews.map(v => this.getViewData(v.viewId)))
    //       .then(views => {
    //           const text = JSON.stringify(this.selectedViews.map((v, vId) => {
    //               return {
    //                   view: views[vId].viewFile,
    //                   layout: v.layout,
    //               }
    //           }));
    //           const blob = new Blob([text], {type: "text/plain;charset=utf-8"});
    //           saveAs(blob, "layout.json");
    //       });
    // }
    importViews = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".json";
        input.onchange = () => {
            const file = input.files[0];
            if (!file) return;

            const fr = new FileReader();
            fr.onload = e => {
                const res = JSON.parse(e.target.result);
                Promise.all(res.map(importView => new Promise(resolve => {
                    this.getViewData(importView.view)
                        .then(view => {
                            resolve({
                                viewId: importView.view,
                                figId: view.figId,
                                viewFile: view.viewFile,
                                condition: importView.condition,
                            })
                        })
                })))
                    .then(viewList => this.setViews(viewList))
            }
            fr.readAsText(file, "utf-8");
        }
        input.click();
    }
    exportViews = () => {
        Promise.all(this.selectedViews.map(v => this.getViewData(v.viewId)))
            .then(views => {
                const text = JSON.stringify(this.selectedViews.map((v, vId) => {
                    return {
                        view: views[vId].viewId,
                        // layout: v.layout,
                        condition: v.condition,
                    }
                }));
                const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
                saveAs(blob, "views.json");
            });
    }

    figures = {};
    getFigureData = figId => new Promise(resolve => {
        if (this.figures[figId]) {
            resolve(this.figures[figId]);
            return;
        }

        queryFigureById(figId)
            .then(res => {
                this.figures[figId] = res;
                resolve(res);
            })
    });
}

const store = new Store();
export default store;
