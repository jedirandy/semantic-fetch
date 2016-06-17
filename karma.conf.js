module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        singleRun: false,
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [
            'node_modules/babel-polyfill/browser.js',
            'test/**/*.js'
        ],
        preprocessors: {
            'test/**/*.js': ['webpack']
        },
        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [{
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015']
                    }
                }],
                noParse: [/sinon\.js/]
            },
        },
        webpackServer: {
            noInfo: true
        },
        reporters: ['progress'],
        color: true,
        autoWatch: true
    })
}