import axios from 'axios';

function APIProvider (baseUrl) {
    const get = (path, headers, params={}) => axios
        .get(
            baseUrl + path,
            {
                headers: headers,
                params: params
            }
        )

    const post =  (path, body, headers={}) => axios({
        method: 'post',
        url: baseUrl + path,
        headers: headers,
        data: body
    })

    const del = (path, headers) => axios
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