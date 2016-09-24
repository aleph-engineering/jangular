module.exports = function (config) {

    config.set({
        basePath: './',
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/angular-mocks/angular-mocks.js',

            // jangular itself
            'dist/jangular.js',

            {
                pattern: 'coffee/*.coffee'
            },
            {
                pattern: 'js/*.js'
            },
            {
                pattern: 'spec_coffee/*.coffee'
            },
            {
                pattern: 'spec_js/*.js'
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
            // jangular itself after coffee
            'dist/jangular.js': ['coverage'],

            'coffee/*.coffee': ['coffee', 'coverage'],
            'js/*.js': ['coverage'],

            'spec_coffee/*.coffee': ['coffee', 'coverage'],
            'spec_js/*.js': ['coverage']
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
