# Semantic Fetch
:tophat: A HTTP library with redefined semantics based on Fetch

[![Build Status](https://travis-ci.org/jedirandy/semantic-fetch.svg?branch=master)](https://travis-ci.org/jedirandy/semantic-fetch)
[![dependencies](https://david-dm.org/jedirandy/semantic-fetch.svg)](https://david-dm.org/jedirandy/semantic-fetch)
[![npm module](https://badge.fury.io/js/semantic-fetch.svg)](https://www.npmjs.org/package/semantic-fetch)
[![codecov.io](https://codecov.io/github/jedirandy/semantic-fetch/coverage.svg?branch=master)](https://codecov.io/github/jedirandy/semantic-fetch?branch=master)


The Fetch API is awesome, but it might need some tweaks when it comes to error handling and body resolving, this library provides an alternative fetcher with the following semantics:

1. success means a response with status < 400
2. failure results from a response with status >= 400, or a network error (status defined as 0)
3. response comes with a body already resolved

## Install
```
npm install semantic-fetch
```

It supports ES6 modules, AMD, CommonJS or a global variable as SemanticFetch
## Example
```javascript
// use fetch polyfill of your choice
// import 'isomorphic-fetch'
import 'whatwg-fetch'
import { createFetch } from 'semantic-fetch'
const fetcher = createFetch(fetch)

fetcher('/api', { method: 'GET' })
    .then(res => {
        // response body is available
        console.log(`${res.status} ${res.body}`)
    })
    .catch(res => {
        if (res.status === 0)
            console.log('network error')
        else
            console.log(`failed due to ${res.body}`)
    })
```

## API

### `createFetch(fetch, bodyResolvers)`

Creates a fetch function
#### Arguments
this fetch creator takes 2 arguments:

 * `fetch` (function)

   the Fetch function, you can inject a fetch implementation of your choice

 * `bodyResolvers` array of (function: (Response, Resolve callback, Next callback) => Unit) [Optional]

   an array of functions that take the response and two callbacks as arguments, then either call resolve callback to resolve the body content, e.g. ```resolve(res.json())```, or pass to the next resolver by calling ```next()```

   defaultBodyResolvers is used if the arg is not provided, which can be imported as ```{ defaultBodyResolver }```, providing text and json resolvers

#### Returns
the enhanced fetch function that takes the same arguments as `fetch`

## License
MIT
