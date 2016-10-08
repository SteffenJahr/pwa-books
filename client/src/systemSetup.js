(function (global) {
    // If process is present, we are running through this code via gulp and try to compile it.
    var isAOTCompilation = !!global.process;
    var npmPath = isAOTCompilation ? './node_modules/' : 'lib/';

    var angularPackages = [
        '@angular/core',
        '@angular/common',
        '@angular/compiler',
        '@angular/platform-browser',
        '@angular/http',
        '@angular/router',
        '@angular/forms'
    ];

    if (!isAOTCompilation) {
        angularPackages.push('@angular/platform-browser-dynamic');
    }

    var mapConfig = {

    };

    var packagesConfig = {
        app: {
            main: isAOTCompilation ? 'main.aot' : 'main',
            defaultExtension: 'js'
        }
    };

    if (isAOTCompilation) {
        packagesConfig.rxjs = {
            defaultExtension: 'js'
        };

        packagesConfig['ng2-translate'] = {
            main: 'ng2-translate',
            defaultExtension: 'js'
        };

        mapConfig.rxjs = 'npm:rxjs';
    }

    angularPackages.forEach(function (p) {
        var name = p.split('/');
        var mappedName = 'npm:' + p;

        if (!isAOTCompilation) {
            mappedName += '/bundles/' + name[1] + '.umd.js';
        }
        else {
            packagesConfig[p] = {
                defaultExtension: 'js',
                main: 'index'
            };
        }

        mapConfig[p] = mappedName;
    });

    var systemConfig = {
        paths: {
            'npm:': npmPath
        },
        map: mapConfig,
        packages: packagesConfig
    };

    System.config(systemConfig);

    if (!isAOTCompilation) {
        System.import('app')
            .catch(console.error.bind(console));
    }
})(this);
