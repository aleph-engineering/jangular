module.exports = function (config) {

    config.set({
        basePath: './',
        files: [
            'node_modules/angular-ui-router/node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            {
                pattern: 'dist/*.js'
            },
            //{
            //    pattern: 'src/*.coffee'
            //},
            {
                pattern: 'spec/*.coffee'
            },
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-coffeelint',
            'karma-coffee-preprocessor',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-coverage'
        ],

        junitReporter: {
            outputFile: 'tmp/unit.xml',
            suite: 'unit'
        },

        reporters: ['progress', 'coverage'],

        preprocessors: {
            // code
            //'src/*.coffee': ['coffeelint', 'coffee', 'coverage'],
            'dist/*.js': ['coverage'],
            // specs
            'spec/*.coffee': ['coffee', 'coverage']
        },
        coffeelint: {
            onStart: true,
            onChange: true,
            options: 'coffeelint.json',
            reporter: {
                type: 'default',
                options: {
                    colorize: true
                }
            }
        },
        coffeePreprocessor: {
            // options passed to the coffee compiler
            options: {
                bare: true,
                sourceMap: false
            },
            // transforming the filenames
            transformPath: function (path) {
                return path.replace(/\.coffee$/, '.js')
            }
        },

    });
}
