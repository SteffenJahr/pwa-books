'use strict';

const path = require('path');

const currentPackage = require('../package.json');

const config = {
    module: currentPackage.name,
    version: currentPackage.version,
    base: 'src',
    index: 'src/index.html',
    manifest: 'src/manifest.json',
    systemJs: 'src/systemSetup.js',
    sources: {
        scripts: [
            'src/**/*.ts',
            'typings/index.d.ts'
        ],
        templates: [
            'src/**/*.html'
        ],
        styles: {
            all: ['src/less/**/*.less'],
            main: [
                'src/less/app.less'
            ],
            vendor: [
                'node_modules/bootstrap/dist/css/bootstrap.css'
            ]
        },
        assets: [
            'src/assets/**/*'
        ],
        resources: [
            'src/resources/**/*'
        ]
    },
    targets: {
        build: 'build',
        lib: 'build/lib',
        assets: 'build/assets',
        resources: 'build/resources'
    },
    typescript: {
        target: 'ES5',
        module: 'system',
        moduleResolution: 'node',
        declaration: false,
        emitDecoratorMetadata: true,
        experimentalDecorators: true,
        removeComments: false,
        noImplicitAny: false
    },
    browsers: ['IE >= 11', 'last 2 versions'],
    browserSync: {
        // Turn off cross-device sync features
        ghostMode: false,
        open: true,
        server: {
            baseDir: './build',
            middleware: {}
        },
        port: 8888
    },
    vendorScripts: [
        'node_modules/core-js/client/shim.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/moment/moment.js',
    ],
    nodeModules: [
        '@angular',
        'rxjs'
    ]
};

config.injectables = [
    ...config.vendorScripts.map(v => path.join(config.targets.lib, v.split('/').slice(-1)[0])),
    path.join(config.targets.build, config.systemJs.split('/').slice(-1)[0]),
    path.join(config.targets.build, '**/*.css')
];

module.exports = config;
