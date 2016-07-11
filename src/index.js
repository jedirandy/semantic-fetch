import {applyResolvers, defaultBodyResolvers} from './resolver'

export const createFetch = (fetch, bodyResolvers = defaultBodyResolvers) => (url, options) =>
    fetch(url, options)
    .then(
        res => Promise.all([applyResolvers(bodyResolvers)(res), Promise.resolve(res)]),
        () => Promise.reject(Response.error())
    )
    .then(([body, res]) => {
        let response = {
            body,
            _res: res,
            status: res.status
        }
        if (res.status < 400)
            return Promise.resolve(response)
        else
            return Promise.reject(response)
    })

export { defaultBodyResolvers }
export default createFetch
module.export = createFetch
