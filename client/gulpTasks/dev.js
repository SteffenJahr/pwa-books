'use strict';

const gulp = require('gulp'),
    del = require('del'),
    config = require('./gulpConfig'),
    sourceMaps = require('gulp-sourcemaps'),
    inlineNg2Template = require('gulp-inline-ng2-template'),
    tsc = require('gulp-typescript'),
    count = require('gulp-count'),
    less = require('gulp-less'),
    batch = require('gulp-batch'),
    autoprefixer = require('gulp-autoprefixer'),
    watch = require('gulp-watch'),
    runSequence = require('run-sequence'),
    path = require('path'),
    browserSync = require('browser-sync').create(),
    inject = require('gulp-inject'),
    precache = require('sw-precache');

gulp.task('dev:clean', () => del(config.targets.build));

function createTypeScriptPipe(sources, fastTranspilation) {
    const tsOptions = Object.assign({}, config.typescript, {
        isolatedModules: !!fastTranspilation
    });

    const ts = sources
        .pipe(inlineNg2Template({
            useRelativePaths: true
        }))
        .pipe(sourceMaps.init())
        .pipe(tsc(tsOptions));

    return ts.js
        .pipe(count('Transpiled ## files'))
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest(config.targets.build))
        .on('end', () => browserSync.reload());
}

gulp.task('dev:scripts', () => createTypeScriptPipe(gulp.src(config.sources.scripts)));

gulp.task('dev:scripts:watch', () => watch([...config.sources.scripts],
    batch(events => createTypeScriptPipe(events, false))));


function getTypeScriptFilesFromTemplateFiles(source) {
    const result = [];
    let file;

    while (file = source.read()) {
        file.extname = '.ts';
        result.push(file.path);
    }

    return result;
}

gulp.task('dev:templates:watch', () => watch([...config.sources.templates],
    batch(events => createTypeScriptPipe(gulp.src(getTypeScriptFilesFromTemplateFiles(events), { base: config.base }), true))));

function createLessPipe(sources) {
    return sources
        .pipe(sourceMaps.init())
        .pipe(less())
        .pipe(autoprefixer({ browsers: config.browsers }))
        .pipe(count('Preprocessed ## style files'))
        .pipe(sourceMaps.write('.'))
        .pipe(gulp.dest(`${config.targets.build}/css`))
        .pipe(browserSync.stream({ match: '**/*.css' }));
}

function createVendorCssPipe(sources) {
    return sources
        .pipe(gulp.dest(`${config.targets.build}/css`))
        .pipe(browserSync.stream({ match: '**/*.css' }));
}

gulp.task('dev:styles:less', () => createLessPipe(gulp.src(config.sources.styles.main)));

gulp.task('dev:styles:vendor', () => createVendorCssPipe(gulp.src(config.sources.styles.vendor)));

gulp.task('dev:styles', (done) => {
    return runSequence(
        'dev:styles:less',
        'dev:styles:vendor',
        done);
});

gulp.task('dev:styles:watch', () => watch(config.sources.styles.all,
    batch(events => createLessPipe(gulp.src(config.sources.styles.main)))));

gulp.task('dev:watch:init', done => {
    browserSync.init(config.browserSync, done);
});

gulp.task('dev:vendorScripts', () => {
    return gulp.src(config.vendorScripts)
        .pipe(gulp.dest(config.targets.lib));
});

gulp.task('dev:nodeModules', () => {
    return gulp.src(config.nodeModules.map(m => path.join('node_modules', m, '**/*')), { base: 'node_modules' })
        .pipe(gulp.dest(config.targets.lib));
});

gulp.task('dev:systemJs', () => {
    return gulp.src(config.systemJs)
        .pipe(gulp.dest(config.targets.build))
        .on('end', () => browserSync.reload());
});

gulp.task('dev:systemJs:watch', () => watch(config.systemJs,
    batch((events, done) => runSequence('dev:systemJs', done))));

gulp.task('dev:index', () => {
    const injectables = gulp.src(config.injectables,
        { read: false });

    return gulp.src(config.index)
        .pipe(inject(injectables, {
            addRootSlash: false,
            ignorePath: config.targets.build
        }))
        .pipe(gulp.dest(config.targets.build))
        .on('end', () => browserSync.reload());
});

gulp.task('dev:index:watch', () => watch(config.index,
    batch((events, done) => runSequence('dev:index', done))));

gulp.task('dev:manifest', () => {
    gulp.src(config.manifest)
        .pipe(gulp.dest(config.targets.build));
});

gulp.task('dev:manifest:watch', () => watch(config.manifest,
    batch((events, done) => runSequence('dev:manifest', done))));

gulp.task('dev:assets', () => {
    return gulp.src(config.sources.assets)
        .pipe(gulp.dest(config.targets.assets));
});

gulp.task('dev:serviceWorker:cache', function (done) {
    precache.write(path.join(config.targets.build, 'serviceWorker.js'), {
        staticFileGlobs: [path.join(config.targets.build, '**', '*.{js,html,css,png,jpg,gif,svg,eot,ttf,woff,json}')],
        stripPrefix: config.targets.build,
        importScripts: ['serviceWorkerNotifications.js']
    }, done);
});

gulp.task('dev:serviceWorker:watch', () => watch(['!' + path.join(config.targets.build, 'serviceWorker.js'), config.targets.build],
    batch((events, done) => runSequence('dev:serviceWorker:cache', done))));

gulp.task('dev:watch', done => {
    runSequence(
        'dev:watch:init',
        [
            'dev:scripts:watch',
            'dev:styles:watch',
            'dev:templates:watch',
            'dev:systemJs:watch',
            'dev:index:watch',
            'dev:manifest:watch'
            //'dev:serviceWorker:watch'
        ],
        done
    );
});

gulp.task('dev-build', done => {
    runSequence(
        'dev:clean',
        [
            'dev:assets',
            'dev:vendorScripts',
            'dev:nodeModules',
            'dev:scripts',
            'dev:styles',
            'dev:systemJs'
        ],
        'dev:manifest',
        'dev:index',
        //'dev:serviceWorker:cache',
        done
    );
});

gulp.task('dev-watch', done => {
    runSequence(
        'dev-build',
        'dev:watch',
        done
    );
});
