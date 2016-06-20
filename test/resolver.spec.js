import {resolveWithTrue, next, applyResolvers, json, text} from '../src/resolver'

describe('resolver', () => {
    it('resolve with true', done => {
        let result = resolveWithTrue()
        let future = new Promise((resolve, result) => {
            let res = resolveWithTrue(resolve)
            expect(res('hello')).to.equal(true)
        })
        future.then(msg => {
            expect(msg).to.equal('hello')
            done()
        })
    })

    it('next returns false', () => {
        expect(next()).to.equal(false)
    })

    describe('apply resolvers', () => {
        let resolver0 = (res, resolve, next) => resolve('0')
        let resolver1 = (res, resolve, next) => next()
        let resolver2 = (res, resolve, next) => resolve('2')
        it('returns the result that is first resolved', done => {
            let future = applyResolvers([
                resolver0,
                resolver1
            ])()
            future.then(result => {
                expect(result).to.equal('0')
                done()
            })
        })
        it('skips the resolver that calls next()', done => {
            let future = applyResolvers([
                resolver1,
                resolver2
            ])()
            future.then(result => {
                expect(result).to.equal('2')
                done()
            })
        })
    })

    describe('default resolvers', () => {
        let jsonRes = new Response(JSON.stringify({msg: 'bonjour'}), {
            headers: {
                'content-type': 'application/json'
            }
        })
        let textRes = new Response('hola', {
            headers: {
                'content-type': 'text/plain'
            }
        })
        let emptyRes = new Response(undefined, {
            headers: {
                'content-type': ''
            }
        })
        it('json', done => {
            let resolve = _ => _.then(json => {
                expect(json.msg).to.equal('bonjour')
                done()
            })
            json(jsonRes, resolve)
        })
        it('json skip', done => {
            json(emptyRes, () => {}, () => done())
        })
        it('text', done => {
            let resolve = _ => _.then(text => {
                expect(text).to.equal('hola')
                done()
            })
            text(textRes, resolve)
        })
        it('text skip', done => {
            text(emptyRes, () => {}, () => done())
        })
    })
})
