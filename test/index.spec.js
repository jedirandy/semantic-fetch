import 'isomorphic-fetch'
import { createFetch, defaultBodyResolver } from '../src'

describe('tests', () => {
    let fetcher
    beforeEach(() => {
        sinon.stub(window, 'fetch')
        fetcher = createFetch(window.fetch)
    })

    afterEach(() => {
        window.fetch.restore()
    })

    describe('fetcher', () => {
        it('resolves with status < 400', done => {
            let response = new Response(JSON.stringify('OK'), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            window.fetch.withArgs().returns(Promise.resolve(response))
            fetcher('/api/ok')
                .then(res => {
                    expect(res).to.be.an('object')
                    expect(res.status).to.equal(200)
                    expect(res.body).to.equal('OK')
                    expect(res._res).to.equal(response)
                    done()
                })
        })

        it('rejects with status >= 400', done => {
            let response = new Response(JSON.stringify('Unauthorized'), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            window.fetch.withArgs().returns(Promise.resolve(response))
            fetcher('/api/account')
                .catch(res => {
                    expect(res).to.be.an('object')
                    expect(res.body).to.equal('Unauthorized')
                    expect(res.status).to.equal(401)
                    expect(res._res).to.equal(response)
                    done()
                })
        })

        it('rejects with network error', done => {
            window.fetch.withArgs().returns(Promise.reject(new TypeError('Failed to fetch')))
            fetcher('/api/error')
                .catch(res => {
                    expect(res.status).to.equal(0)
                    done()
                })
        })
    })

    describe('default body resolver', () => {
        it('defaults to blob resolver', done => {
            let blob = new Blob(['hello'])
            let response = new Response(blob, {
                headers: {
                    'content-type': ''
                }
            })
            defaultBodyResolver(response).then(body => {
                expect(body.size).to.equal(5)
                done()
            })
        })
        it('resolves text', done => {
            let response = new Response('Hello', {
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
            defaultBodyResolver(response).then(body => {
                expect(body).to.equal('Hello')
                done()
            })
        })
        it('resolves json', done => {
            let response = new Response(JSON.stringify({name: 'a'}), {
                headers: {
                    'content-type': 'application/json'
                }
            })
            defaultBodyResolver(response).then(body => {
                expect(body).to.deep.equal({name: 'a'})
                done()
            })
        })
    })
})
