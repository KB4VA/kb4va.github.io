export default function generateDataStructureFromFields(selectedFields, allFields) {
    const types = {};

    const addType = t => {
        if (!types[t]) types[t] = 0;
        types[t]++;
    }

    allFields.forEach(field => {
        if (selectedFields.includes(field.name))
            addType(field.type);
    });

    return Object.keys(types).map(t => `${t}×${types[t]}`).join(" ");
}
