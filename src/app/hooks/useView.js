import {useEffect, useState} from "react";
import store from "../../store";

export default function useView(viewId) {
    const [view, setView] = useState({
        viewId,
        figFile: "",
        viewFile: "",
        specification: "",
        actionTargets:[],
        compositions: [],
        marks: [],
        channels: [],
        dataTypes:[],
        aggregates: [],
        figBox: {x: 0, y: 0, width: 0, height: 0},
        figCaption: "",
        figId: "",
    });

    useEffect(() => {
        if (!viewId) return;
        store.getViewData(viewId)
          .then(res => {
              setView(res);
          });
    }, [viewId]);

    return view;
}
