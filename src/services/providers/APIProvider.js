import axios from 'axios';

function APIProvider (baseUrl) {
    const get = async (path, headers={}) => await axios
        .get(
            baseUrl + path,
            {
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

    const post = async (path, body, headers={}) => await axios({
        method: 'post',
        url: baseUrl + path,
        headers: headers,
        data: body
    }).catch(err => console.log('API POST Error', err))

    const del = async (path, headers) => await axios
        .delete(baseUrl + path,
            {
                headers: headers
            }
    );

    return {
        get, post, del
    }
}

export default APIProvider