/**
 * Created by Vadim on 12/10/15.
 */
'use strict';
var modules = [];
var promises = [];
var bundle = {
    assets: [],
    vendor: {
        styles: {},
        scripts: {}
    },
    custom: {
        styles: {},
        scripts: {}
    }
};

module.exports = {
    name: 'Configuration',
    entity: {
        addModule: function (module) {
            modules.push(module);
        },
        getModules: function () {
            return modules;
        },
        addVendorStyle: function (src, minSrc) {
            var key = src || minSrc;
            bundle.vendor.styles[key] = {
                src: src,
                minSrc: minSrc
            };
        },
        addVendorScript: function (src, minSrc) {
            var key = src || minSrc;
            bundle.vendor.scripts[key] = {
                src: src,
                minSrc: minSrc
            };
        },
        addCustomStyles: function (src, minSrc) {
            var key = src || minSrc;
            bundle.custom.styles[key] = {
                src: src,
                minSrc: minSrc
            };
        },
        addCustomScript: function (src, minSrc) {
            var key = src || minSrc;
            bundle.custom.scripts[key] = {
                src: src,
                minSrc: minSrc
            };
        },
        addAssetFolder: function (path) {
            bundle.assets.push(path);
        },
        getBundle: function () {
            return bundle;
        },
        addPromise: function (promise) {
            promises.push(promise);
        },
        getPromises: function () {
            return promises;
        }
    }
};