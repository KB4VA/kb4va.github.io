import snake2word from "../utils/snake2word";

const constValues = {
    actions: {
        consume: [
            { value: "consume-present", label: "present" },
            { value: "consume-discover", label: "discover" },
            { value: "consume-enjoy", label: "enjoy" },
        ],
        produce: [
            { value: "produce", label: "produce" }
        ],
        search: [
            { value: "search-lookup", label: "lookup" },
            { value: "search-browse", label: "browse" },
            { value: "search-locate", label: "locate" },
            { value: "search-explore", label: "explore" },
        ],
        query: [
            { value: "query-identify", label: "identify" },
            { value: "query-compare", label: "compare" },
            { value: "query-summarize", label: "summarize" }
        ],
    },
    targets: {
        Attributes: [
            { value: "Attributes-values", label: "values" },
            { value: "Attributes-distribution", label: "distribution" },
            { value: "Attributes-range", label: "range" },
            { value: "Attributes-extremes", label: "extremes" },
            { value: "Attributes-outliers", label: "anomalies" },
            { value: "Attributes-clusters", label: "clusters" },
            { value: "Attributes-order", label: "order" },
            { value: "Attributes-correlation", label: "correlation" },
            { value: "Attributes-similarity", label: "similarity" }],
        Graphs: [
            { value: "Graphs-graphs", label: "graphs" },
            { value: "Graphs-nodes", label: "nodes" },
            { value: "Graphs-links/paths", label: "links/paths" },
            { value: "Graphs-topology/structures", label: "topology/structures" },
            { value: "Graphs-clusters/groups", label: "clusters/groups" }]
    },
    aggregates: [
        { value: "count", label: "count" },
        { value: "bin", label: "bin" },
        { value: "average", label: "average" },
        { value: "sum", label: "sum" },
        { value: "median", label: "median" },
        { value: "variance", label: "variance" },
    ],
    marks: [
        { value: "bar", label: "bar" },
        { value: "point", label: "scatter plot" },
        { value: "line", label: "line" },
        { value: "rect", label: "rect" },
        { value: "area", label: "area" },
        { value: "unit", label: "unit" },
        { value: "arc", label: "pie/donut" },
        { value: "sankey", label: "sankey" },
        { value: "geoshape", label: "map" },
        { value: "radar", label: "radar" },
        { value: "tree", label: "tree" },
        { value: "boxplot", label: "boxplot" },
        { value: "tick", label: "tick" },
        { value: "surface", label: "surface" },
        { value: "text", label: "text" },
        { value: "treemap", label: "treemap" },
        { value: "word_cloud", label: "word cloud" },
        { value: "circle", label: "circle" },
        { value: "rule", label: "rule" },
        { value: "image", label: "image" },
        { value: "dandelion", label: "dandelion" },
        { value: "icicle", label: "icicle" },
        { value: "icon", label: "icon" },
        { value: "storyline", label: "storyline" },
        { value: "sunburst", label: "sunburst" },
        { value: "venn", label: "venn" },
        { value: "calendar", label: "calendar" },
        { value: "contour", label: "contour" },
        { value: "graph", label: "graph" },
        { value: "matrix", label: "matrix" },
        { value: "vector", label: "vector" },
        { value: "others", label: "others" },],
    dataTypes: [
        { value: "quantitative", label: "quantitative" },
        { value: "nominal", label: "nominal" },
        // { value: "node", label: "node" },
        { value: "temporal", label: "temporal" },
        // { value: "relation", label: "relation" },
        { value: "ordinal", label: "ordinal" }],
    compositions: [
        { value: "nested", label: "nested" },
        { value: "layer", label: "layer" },
        { value: "facet", label: "facet" },
        { value: "concat", label: "concat" },
    ],
    channels: [
        { value: "x", label: "x" },
        { value: "y", label: "y" },
        { value: "color", label: "color" },
        { value: "node", label: "node" },
        { value: "link", label: "link" },
        { value: "theta", label: "theta" },
        { value: "size", label: "size" },
        { value: "radius", label: "radius" },
        { value: "unit", label: "unit" },
        { value: "text", label: "text" },
        { value: "xoffset", label: "xoffset" }]
}

export default constValues;
