/**
 * Created by Vadim on 12/10/15.
 */
'use strict';
var _ = require('lodash');
var modules = [];
var promises = [];
var bundle = {
    assets: [],
    beforeVendor: {
        styles: {},
        scripts: {}
    },
    vendor: {
        styles: {},
        scripts: {}
    },
    afterVendor: {
        styles: {},
        scripts: {}
    },
    beforeCustom: {
        styles: {},
        scripts: {}
    },
    custom: {
        styles: {},
        scripts: {}
    },
    afterCustom: {
        styles: {},
        scripts: {}
    },
    front: {},
    dashboard: {},
    overrideFront: {},
    overrideDashboard: {},
    cssFiles: {}
};

module.exports = {
    name: 'Configuration',
    entity: {
        addModule: function (module) {
            modules.push(module);
        },
        getModules: function () {
            return _.uniq(modules);
        },
        addVendorStyleBefore: function (src, minSrc) {
            var key = src || minSrc;
            bundle.beforeVendor.styles[key] = {
                src: src,
                minSrc: minSrc
            };
        },
        addVendorStyle: function (src, minSrc) {
            var key = src || minSrc;
            bundle.vendor.styles[key] = {
                src: src,
                minSrc: minSrc
            };
        },
        addVendorStyleAfter: function (src, minSrc) {
            var key = src || minSrc;
            bundle.afterVendor.styles[key] = {
                src: src,
                minSrc: minSrc
            };
        },
        addVendorScriptBefore: function (src, minSrc) {
            var key = src || minSrc;
            bundle.beforeVendor.scripts[key] = {
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
        addVendorScriptAfter: function (src, minSrc) {
            var key = src || minSrc;
            bundle.afterVendor.scripts[key] = {
                src: src,
                minSrc: minSrc
            };
        },
        addCustomStyleBefore: function (src, minSrc) {
            var key = src || minSrc;
            bundle.beforeCustom.styles[key] = {
                src: src,
                minSrc: minSrc
            };
        },
        addCustomStyle: function (src, minSrc) {
            var key = src || minSrc;
            bundle.custom.styles[key] = {
                src: src,
                minSrc: minSrc
            };
        },
        addCustomStyleAfter: function (src, minSrc) {
            var key = src || minSrc;
            bundle.afterCustom.styles[key] = {
                src: src,
                minSrc: minSrc
            };
        },
        addCustomScriptBefore: function (src, minSrc) {
            var key = src || minSrc;
            bundle.beforeCustom.scripts[key] = {
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
        addCustomScriptAfter: function (src, minSrc) {
            var key = src || minSrc;
            bundle.afterCustom.scripts[key] = {
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
        },
        addFrontStyles: function (file) {
            bundle.front[file] = file;
        },
        addDashboardStyle: function (file) {
            bundle.dashboard[file] = file;
        },
        addFrontOverrideStyle: function (file) {
            bundle.overrideFront[file] = file;
        },
        addDashboardOverrideStyle: function (file) {
            bundle.overrideDashboard[file] = file;
        },
        addCssFile: function (obj) {
            bundle.cssFiles[obj.fileName] = obj;
        }
    }
};