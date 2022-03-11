import {useEffect, useState} from "react";
import store from "../../store";

export default function useFigure(props) {
    const [selected, select] = useState(0);

    const [figure, setFigure] = useState({
        title: "",
        caption: "",
        viewIds: [],
    });

    useEffect(() => {
        if (!props) return;
        const {figId, initViewId} = props;
        store.getFigureData(figId)
          .then(res => {
              setFigure(res);
              res.viewIds.forEach((viewId, vId) => {
                  if (viewId === initViewId) {
                      select(vId);
                  }
              })
          });
    }, [props])

    return {
        ...figure,
        selected,
        select,
    };
}
