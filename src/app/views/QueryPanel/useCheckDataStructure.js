import {useState} from "react";

const checkParenthesisMatch = (expr) => {
    const stack = [];

    for (let i = 0; i < expr.length; i++) {
        const char = expr[i]
        if (["(", "{", "["].indexOf(char) > -1){
            stack.push(char)
        }
        else if ([")", "}", "]"].indexOf(char) > -1){
            if (stack.length === 0)
                return false
            const current_char = stack.pop();
            if (current_char === '(')
                if (char !== ")")
                    return false
            if (current_char === '[')
                if (char !== "]")
                    return false
        }
    }
    return stack.length <= 0;

}

export default function useCheckDataStructure(ds) {
    const [errorDataStructure, setErrorText] = useState(null);

    const checkDataStructure = () => {
        const res = checkParenthesisMatch(ds);
        if (!res) setErrorText("Parenthesis is not matched");
        return res;
    }
    const resetCheckWarning = () => setErrorText(null);

    return {errorDataStructure, checkDataStructure, resetCheckWarning};
}
