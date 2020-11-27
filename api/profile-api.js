import { handleError } from "./auth-api";

export const profile = (url) => {    
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: null
    };

    return fetch(url, requestOptions)
        .then(response =>                     
            response.json()            
        ).then((json) => {
            return handleError(json);
          })
          .catch((error) => {
            console.error(error);
          });
}