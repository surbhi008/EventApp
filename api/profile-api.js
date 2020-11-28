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

export const updateProfile = (url, data) => {
    const body = {
        "userId": data.userId,
        "userName": data.userName,
        "fullName": data.fullName,
        "email": data.email,
        "imageURL": data.imageURL,
        "miles": data.miles,
        "address": data.address,
        "locationLatLong": data.locationLatLong,        
        "password": data.password
    }
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
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
