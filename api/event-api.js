import { handleError } from "./auth-api";

export const fetchEventListApi = (url) => {
   
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
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

export const addEventApi = (url, data) => {   
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
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

export const deleteEventApi = (url, data) => {   
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
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


export const updateEventApi = (url, data) => {   
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
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
