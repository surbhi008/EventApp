
const handleError = (response) => {
    return response.status == 200 ? 
    {
        success: true,
       data: response.data
    } : {
        success: false,
       data: {}
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