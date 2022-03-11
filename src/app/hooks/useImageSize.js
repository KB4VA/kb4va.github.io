import {useSize} from "ahooks";
import {useEffect, useState} from "react";

export default function useImageSize(type, cRef) {
    const {width: cw, height: ch} = useSize(cRef);
    const [[nw, nh], setNaturalSize] = useState([0, 0]);
    const [[width, height], setSize] = useState([cw, ch]);

    useEffect(() => {
        let w = cw, h = ch;
        if (type === "fill") {
            const scale = Math.max(cw / nw, ch / nh);
            w = nw * scale;
            h = nh * scale;
        }
        if (type === "center") {
            const scale = Math.min(cw / nw, ch / nh);
            w = nw * scale;
            h = nh * scale;
        }
        if (type === "fullHeight") {
            const scale = ch / nh;
            w = nw * scale;
            h = nh * scale;
        }

        setSize([w, h]);
    }, [ch, cw, nh, nw, type])

    const loadedImage = (e) => {
        const nw = e.target.naturalWidth, nh = e.target.naturalHeight;
        setNaturalSize([nw, nh]);
    }

    return {width, height, loadedImage};
}
