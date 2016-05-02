module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        singleRun: false,
        frameworks: ['mocha', 'chai', 'sinon'],
        files: [{
            pattern: 'test/**/*.spec.js', watched: false, included: true, served: true
        }],
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
                postLoaders: [{
                    test: /\.js$/,
                    exclude: /(test|node_modules)\//,
                    loader: 'istanbul-instrumenter'
                }],
                noParse: [/sinon\.js/]
            }
        },
        webpackServer: {
            noInfo: true
        },
        reporters: ['progress', 'coverage'],
        color: true,
        autoWatch: true,
        coverageReporter: {
            type: 'lcov'
        }
    });
};
