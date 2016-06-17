# Semantic Fetch
:tophat: A HTTP library with redefined semantics based on Fetch

[![Build Status](https://travis-ci.org/jedirandy/semantic-fetch.svg?branch=master)](https://travis-ci.org/jedirandy/semantic-fetch)
[![dependencies](https://david-dm.org/jedirandy/semantic-fetch.svg)](https://david-dm.org/jedirandy/semantic-fetch)
[![npm module](https://badge.fury.io/js/semantic-fetch.svg)](https://www.npmjs.org/package/semantic-fetch)

The Fetch API is awesome, but it might need some tweaks when it comes to error handling and body resolving, this library provides an alternative fetcher with the following semantics:

1. success means a response with status < 400
2. failure results from a response with status >= 400, or a network error (status defined as 0)
3. response comes with a body already resolved

## Install
```
npm install --save semantic-fetch
```

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
        if (res.status === 0)
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
the enhanced fetch function that takes the same arguments as `fetch`

## License
MIT