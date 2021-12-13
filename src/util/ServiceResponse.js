

export const getResponseObject = (status, payload) => {
    return {
        state: status,
        data: payload
    }
}