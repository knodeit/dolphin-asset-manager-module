/**
 * Created by Vadim on 12/3/15.
 */
'use strict';

var Module = require('dolphin-core-modules').Module;
var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var bundleAssets = require('gulp-bundle-assets');
var fs = require('fs');
var Q = require('q');
var deferred = Q.defer();

var myModule = new Module('AssetManager', __dirname);

myModule.configureFactories(function (WebServerConfigurationFactory) {
    WebServerConfigurationFactory.addPromise(deferred.promise);
    WebServerConfigurationFactory.addStaticSource({url: '/public', path: 'public'});
});

myModule.run(function (WebServerConfigurationFactory, AssetManagerConfigurationFactory) {
    //wait for other modules
    var promises = AssetManagerConfigurationFactory.getPromises();
    Q.all(promises).then(function () {
        var destPath = process.cwd() + '/public';
        var urlPath = '/public/';
        var i;

        //init config
        var confFile = {
            bundle: {
                vendor: {
                    styles: [],
                    scripts: [],
                    options: {
                        useMin: true
                    }
                },
                custom: {
                    styles: [],
                    scripts: [],
                    options: {
                        uglify: true,
                        minCSS: true,
                        useMin: true
                    }
                }
            },
            copy: []
        };

        var bundle = AssetManagerConfigurationFactory.getBundle();

        //copy assets
        for (i in bundle.assets) {
            confFile.copy.push(bundle.assets[i]);
        }

        //vendor
        if (Object.keys(bundle.vendor.scripts).length > 0) {
            for (i in bundle.vendor.scripts) {
                confFile.bundle.vendor.scripts.push(bundle.vendor.scripts[i]);
            }
        }
        if (Object.keys(bundle.vendor.styles).length > 0) {
            for (i in bundle.vendor.styles) {
                confFile.bundle.vendor.styles.push(bundle.vendor.styles[i]);
            }
        }

        //custom
        if (Object.keys(bundle.custom.scripts).length > 0) {
            for (i in bundle.custom.scripts) {
                confFile.bundle.custom.scripts.push(bundle.custom.scripts[i]);
            }
        }
        if (Object.keys(bundle.custom.styles).length > 0) {
            for (i in bundle.custom.styles) {
                confFile.bundle.custom.styles.push(bundle.custom.styles[i]);
            }
        }

        //write conf to file
        fs.writeFileSync(__dirname + '/bundle.config.js', 'module.exports=' + JSON.stringify(confFile) + ';', 'utf-8');

        gulp.task('AssetManager:bundle', ['AssetManager:clean'], function () {
            return gulp.src(__dirname + '/bundle.config.js')
                .pipe(bundleAssets())
                .pipe(bundleAssets.results({
                    dest: destPath,
                    pathPrefix: urlPath
                }))
                .pipe(gulp.dest(destPath)).on('end', deferred.resolve);
        });

        gulp.task('AssetManager:clean', function () {
            return gulp.src(destPath, {read: false})
                .pipe(rimraf());
        });

        gulp.start('AssetManager:bundle');
    });
});