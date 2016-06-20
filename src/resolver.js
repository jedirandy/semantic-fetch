export const resolveWithTrue = resolve => (...args) => resolve(...args) || true
export const next = () => false

export const applyResolvers = resolvers => res =>
    new Promise((resolve) => {
        resolvers.reduce((isResolved, r) => {
            if (isResolved)
                return true
            return r(res, resolveWithTrue(resolve), next)
        }, false)
    })

export const json = (res, resolve, next) => {
    let contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json'))
        resolve(res.json())
    else
        next()
}

export const text = (res, resolve, next) => {
    let contentType = res.headers.get('content-type') || ''
    if (contentType.includes('text/plain'))
        return resolve(res.text())
    else
        return next()
}

export const defaultResolvers = [text, json]
