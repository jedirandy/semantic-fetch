# Semantic Fetch
:tophat: A Fetch API enhancer with redefined semantics

The Fetch API is awesome, but it might need some tweaks when it comes to error handling and body resolving, this library provides an alternative fetcher with the following semantics:

1. success means a response with status < 400
2. failure results from a response with status >= 400, or a network error (status defined as 0)
3. response comes with a body already resolved

## Getting started
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
        if (res.status = 0)
            console.log('network error')
        else
            console.log(`failed due to ${res.body}`)
    })
```

## API

### `createFetch(fetch, bodyResolver)`

Creates a fetch function
#### Arguments
this fetch creator takes 2 arguments:

 * `fetch` (function)

   the Fetch function, you can inject a fetch implementation of your choice

 * `bodyResolver` (function: Response => Promise)

   a function that takes the response and returns a body resolver, e.g. ```res.json()```,
   a default bodyResolver is provided in case absence

#### Returns
the enhanced fetch function

## License
MIT