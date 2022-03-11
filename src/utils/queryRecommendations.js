import {queryViews} from "../database/views";

export default function queryRecommendations(condition) {
    return new Promise(resolve => {
        // if we have a backend, replace this with fetch API and move the database into the backend
        queryViews(condition)
          .then(res => resolve(res));
    })
}
