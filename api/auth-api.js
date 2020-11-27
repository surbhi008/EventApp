
export const handleError = (response) => {
    return {
        success: response.status == 200,
        data: response.data,
        message: response.message || "Something went wrong."
    }
}

export const login = (url, data) => {
    const body = {
        "userName": data.userName,
        "password": data.password
      }
    const requestOptions = {
        method: 'POST',
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

export const signup = (url, data) => {
    const body = {
        "userName": data.userName,
        "email": data.email,
        "password": data.password
    }
    const requestOptions = {
        method: 'POST',
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
        method: 'POST',
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
