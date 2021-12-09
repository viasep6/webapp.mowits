import axios from 'axios';

function APIProvider (baseUrl) {
    const get = async (path, headers={}, params={}) => await axios
        .get(
            baseUrl + path,
            {
                params: params,
                headers: headers
            }
        )
        .catch((error) => {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
                switch (error.response.status) {
                    case 403:
                        throw new Error(error.response.data)
                    case 404:
                        throw new Error(error.response.data)
                    default:
                        throw new Error('Unable to complete the request at the moment')
                }
            } else if (error.request) {
                throw new Error('Unable to connect to the server')
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                // console.log(error.request);
            } else {
                throw new Error('Unknown error.')
                // Something happened in setting up the request that triggered an Error
            }
        });
    
    return {
        get
    }
}

export default APIProvider