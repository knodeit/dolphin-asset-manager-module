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
                beforeVendor: {
                    styles: [],
                    scripts: [],
                    options: {
                        useMin: true
                    }
                },
                vendor: {
                    styles: [],
                    scripts: [],
                    options: {
                        useMin: true
                    }
                },
                afterVendor: {
                    styles: [],
                    scripts: [],
                    options: {
                        useMin: true
                    }
                },
                beforeCustom: {
                    styles: [],
                    scripts: [],
                    options: {
                        uglify: true,
                        minCSS: true,
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
                },
                afterCustom: {
                    styles: [],
                    scripts: [],
                    options: {
                        uglify: true,
                        minCSS: true,
                        useMin: true
                    }
                },
                front: {
                    styles: [],
                    options: {
                        minCSS: true,
                        rev: false
                    }
                },
                dashboard: {
                    styles: [],
                    options: {
                        minCSS: true,
                        rev: false
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

        //before vendor
        if (Object.keys(bundle.beforeVendor.scripts).length > 0) {
            for (i in bundle.beforeVendor.scripts) {
                confFile.bundle.beforeVendor.scripts.push(bundle.beforeVendor.scripts[i]);
            }
        }
        if (Object.keys(bundle.beforeVendor.styles).length > 0) {
            for (i in bundle.beforeVendor.styles) {
                confFile.bundle.beforeVendor.styles.push(bundle.beforeVendor.styles[i]);
            }
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

        //after vendor
        if (Object.keys(bundle.afterVendor.scripts).length > 0) {
            for (i in bundle.afterVendor.scripts) {
                confFile.bundle.afterVendor.scripts.push(bundle.afterVendor.scripts[i]);
            }
        }
        if (Object.keys(bundle.afterVendor.styles).length > 0) {
            for (i in bundle.afterVendor.styles) {
                confFile.bundle.afterVendor.styles.push(bundle.afterVendor.styles[i]);
            }
        }

        //before custom
        if (Object.keys(bundle.beforeCustom.scripts).length > 0) {
            for (i in bundle.beforeCustom.scripts) {
                confFile.bundle.beforeCustom.scripts.push(bundle.beforeCustom.scripts[i]);
            }
        }
        if (Object.keys(bundle.beforeCustom.styles).length > 0) {
            for (i in bundle.beforeCustom.styles) {
                confFile.bundle.beforeCustom.styles.push(bundle.beforeCustom.styles[i]);
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

        //after custom
        if (Object.keys(bundle.afterCustom.scripts).length > 0) {
            for (i in bundle.afterCustom.scripts) {
                confFile.bundle.afterCustom.scripts.push(bundle.afterCustom.scripts[i]);
            }
        }
        if (Object.keys(bundle.afterCustom.styles).length > 0) {
            for (i in bundle.afterCustom.styles) {
                confFile.bundle.afterCustom.styles.push(bundle.afterCustom.styles[i]);
            }
        }

        //css front
        if (bundle.front.length > 0) {
            confFile.bundle.front.styles = bundle.front;
        }
        //css dashboard
        if (bundle.dashboard.length > 0) {
            confFile.bundle.dashboard.styles = bundle.dashboard;
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