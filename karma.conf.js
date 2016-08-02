module.exports = function (config) {

    config.set({
        basePath: './',
        files: [
            'node_modules/angular-ui-router/node_modules/angular/angular.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'node_modules/angular-mocks/angular-mocks.js',

            'dist/jangular.js',

            'spec/samples/module.coffee',

            'spec/samples/http_service.coffee',
            'spec/samples/controller.coffee',
            'spec/samples/state.coffee',

            'spec/http_service.spec.coffee',
            'spec/controller.spec.coffee',
            'spec/state.spec.coffee',
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
            'dist/jangular.js': ['coverage'],

            // samples
            'spec/samples/module.coffee': ['coffee', 'coverage'],

            'spec/samples/http_service.coffee': ['coffee', 'coverage'],
            'spec/samples/controller.coffee': ['coffee', 'coverage'],
            'spec/samples/state.coffee': ['coffee', 'coverage'],

            // specs
            'spec/http_service.spec.coffee': ['coffee', 'coverage'],
            'spec/controller.spec.coffee': ['coffee', 'coverage'],
            'spec/state.spec.coffee': ['coffee', 'coverage']
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
