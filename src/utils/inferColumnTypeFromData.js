const isTimeField = (colData, field) => {
    const timeWords = ["year", "month", "day", "hour", "minute", "second", "date", "time", "timestamp", "timestamps"];
    const lowerCaseField = field.toLowerCase();
    for (const word of timeWords) {
        if (lowerCaseField.endsWith(word))
            return true;
    }
    return false;
}

const isAllNumber = (colData, field) => {
    for (const d of colData)
        if (isNaN(d)) {
            console.log(`Field ${field} has non-numerical data ${d}.`);
            return false;
        }
    return true;
}

const isOrderField = (colData, field) => {
    const orderWords = ["index", "idx", "id", "i"];
    const lowerCaseField = field.toLowerCase();
    for (const word of orderWords) {
        if (lowerCaseField.endsWith(word)) {
            console.log(`Field ${field} is regarded as order field because of the field name includes ${word}.`);
            return true;
        }
    }

    const diff = colData[0];
    for (let i = 1; i < colData.length; i++)
        if (i + diff !== colData[i])
            return false;

    console.log(`Field ${field} is regarded as order field because the data is in order.`);
    return true;
}

export default function inferColumnTypeFromData(colData, field) {
    if (isTimeField(colData, field)) return "T";
    if (isAllNumber(colData, field)) {
        if (isOrderField(colData, field)) return "O";
        else return "Q";
    }
    return "N";
}
