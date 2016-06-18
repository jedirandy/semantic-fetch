export const defaultBodyResolver = (res) => {
    let contentType = res.headers.get('content-type') || ''
    if (contentType.includes('text/plain'))
        return res.text()
    if (contentType.includes('application/json'))
        return res.json()
    return res.blob()
}

export const createFetch = (fetch, bodyResolver = defaultBodyResolver) => (url, options) =>
    fetch(url, options)
    .then(
        res => Promise.all([bodyResolver(res), Promise.resolve(res)]),
        () => Promise.reject(Response.error())
    )
    .then(([body, res]) => {
        let response = ({
            body,
            _res: res,
            status: res.status
        })
        if (res.status < 400)
            return Promise.resolve(response)
        else
            return Promise.reject(response)
    })

export default createFetch
module.export = createFetch
