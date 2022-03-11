import loadDatabase from "./loadDatabase";
import packageJson from "../../package.json";

const {data, ensureLoading} = loadDatabase(`${packageJson.homepage}/knowledgeBase.json`, []);
// const { data, ensureLoading } = loadDatabase(`${process.env.PUBLIC_URL}/knowledgeBase.json`, []);

let count = 1

const viewMatchCondition = (view, condition) => {


    const isArray = (spec) =>{
        return typeof (spec) == "object" && Array.isArray(spec)
    }

    const compareSpec = (specInCondition, specInView) => {
        if (specInCondition === "*") return true
        else if (specInView == specInCondition) return true
        else if (typeof (specInView) != typeof (specInCondition)) return false
        else if (typeof (specInView) == "string" && specInView != specInCondition) return false
        // console.log("prev", specInCondition, specInView)
        let match = true

        if (isArray(specInCondition) && isArray(specInView)){
            let allCondMatch = true
            let viewIndex = []
            specInCondition.forEach((itemCondition) => {
                if (allCondMatch){
                    let curCondMatch = false
                    specInView.forEach((itemView, index) => {
                        if (viewIndex.indexOf(index) == -1 && !curCondMatch){
                            if (compareSpec(itemCondition, itemView)){
                                curCondMatch = true
                                viewIndex.push(index)
                            }
                        }
                    })
                    if (!curCondMatch){
                        allCondMatch = false
                    }
                }
            })
            return allCondMatch
        }
        else if (typeof (specInCondition) == "object"){
            Object.keys(specInCondition).forEach((key) => {
                if (specInView[key] == undefined) match = false
                else if (match) match = compareSpec(specInCondition[key], specInView[key])
            })
        }
        return match
    }

    const specMatch = (specInCondition, specInView) => {
        if (specInCondition == {}) return true
        let match = false
        // compare current level
        match = compareSpec(specInCondition, specInView)
        // console.log(match)
        if (match) return true
        else if (typeof (specInView) == "string") return match
        else if (isArray(specInView)){
            specInView.forEach((specItem) => {
                if (!match) match = specMatch(specInCondition, specItem)
            })
        }
        else if (typeof (specInView) == "object") {
            Object.keys(specInView).forEach((key) => {
                if (!match) match = specMatch(specInCondition, specInView[key])
            })
        }
        return match
    }


    const typeMatch = (typeInCondition, typeInView) => {
        if (typeInCondition.length === 0) return true
        let match = false
        typeInCondition.forEach(item => {
            // console.log(typeInView.includes(item))
            if (typeInView.includes(item)) match = true;
        })
        return match;
    }

    const typeMatchAll = (typeInCondition, typeInView) => {
        if (typeInCondition.length === 0) return true
        let match = true
        typeInCondition.forEach(item => {
            // console.log(typeInView.includes(item))
            if (!typeInView.includes(item)) match = false
        })
        return match;
    }

    const typeMatchCombine = (typeInCondition1, typeInCondition2, typeInView) => {
        let match = false
        if (typeInCondition1.length === 0 && typeInCondition2.length === 0) {
            match = true
        }
        else if (typeInCondition1.length === 0) {
            typeInCondition2.forEach(item2 => {
                typeInView.forEach(viewItem => {
                    if (viewItem.includes(item2)) match = true
                })
            })
        }
        else if (typeInCondition2.length === 0) {
            typeInCondition1.forEach(item1 => {
                typeInView.forEach(viewItem => {
                    if (viewItem.includes(item1)) match = true
                })
            })
        }
        else {
            typeInCondition1.forEach(item1 => {
                typeInCondition2.forEach(item2 => {
                    const combineInCondition = `${item1}:${item2}`
                    if (typeInView.includes(combineInCondition)) match = true
                })
            })
        }
        return match;
    }


    let match = specMatch(condition.specification, view.specification)
    if (!match) return [false, {
        vis: 0,
        task: 0,
        data: 0,
        sum: 0,
    }]

    match = typeMatchCombine(condition.actions, 
        condition.targets, 
        view.actionTargets);
    if (!match) return [false, {
        vis: 0,
        task: 0,
        data: 0,
        sum: 0,
    }]

    match = typeMatch(condition.compositions, view.compositions);
    if (!match) return [false, {
        vis: 0,
        task: 0,
        data: 0,
        sum: 0,
    }]

    match = typeMatchAll(condition.marks, view.marks);
    if (!match) return [false, {
        vis: 0,
        task: 0,
        data: 0,
        sum: 0,
    }]

    match = typeMatch(condition.channels, view.channels);
    if (!match) return [false, {
        vis: 0,
        task: 0,
        data: 0,
        sum: 0,
    }]

    match = typeMatchAll(condition.datas, view.dataTypes);
    if (!match) return [false, {
        vis: 0,
        task: 0,
        data: 0,
        sum: 0,
    }]

    match = typeMatch(condition.aggregates, view.aggregates);
    if (!match) return [false, {
        vis: 0,
        task: 0,
        data: 0,
        sum: 0,
    }]



    // const visMatchNum = typeMatchNum(condition.visType, view.figVis);
    // if (visMatchNum > 0) found = true

    return [true, {
        vis: 0,
        task: 0,
        data: 0,
        sum: 0,
    }]
}




const queryViews = condition => new Promise(resolve => {
    ensureLoading(() => {
        const views = data.current;

        console.log(data.current);

        const recommendations = [];

        views.forEach(view => {
            const [isMatch, rankScore] = viewMatchCondition(view, condition);
            if (isMatch)
                recommendations.push({
                    viewId: view.viewId,
                    rankScore,
                })
        })

        resolve(recommendations);
    });
})

const queryViewById = viewId => new Promise(resolve => {
    ensureLoading(() => {
        const views = data.current;

        for (const view of views)
            if (view.viewId === viewId)
                resolve({
                    viewId,
                    figFile: `https://github.com/KB4VA/data/blob/main/figures/systems/${view.figFile}?raw=true`,
                    viewFile: `https://github.com/KB4VA/data/blob/main/figures/views/${view.viewFile}?raw=true`,
                    specification: view.specification,
                    actionTargets: view.actionTargets,
                    compositions: view.compositions,
                    marks: view.marks,
                    channels: view.channels,
                    dataTypes: view.dataTypes,
                    aggregates: view.aggregates,
                    figBox: view.figBox,
                    figCaption: view.figCaption,
                    figId: view.figId,
                    relationText: view.relationText,
                    note: view.note,
                });
    });
});

export { queryViews, queryViewById };
