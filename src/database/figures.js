import loadDatabase from "./loadDatabase";
import packageJson from "../../package.json";

const {data, ensureLoading} = loadDatabase(`${packageJson.homepage}/figKnowledgeBase.json`);
// const {data, ensureLoading} = loadDatabase(`${process.env.PUBLIC_URL}/figKnowledgeBase.json`);

const queryFigureById = figId => new Promise(resolve => {
    ensureLoading(() => {
        const figs = data.current;

        for (const fig of figs)
            if (fig.figId === figId)
                resolve({
                    figId,
                    title: fig.title,
                    caption: fig.caption,
                    viewIds: fig.viewIds,
                });
    });
});

export {queryFigureById};
