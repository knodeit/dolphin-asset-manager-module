### Installation
```npm install dolphin-asset-manager-package --save```


### AssetManagerConfigurationFactory

The factory has default methods:

methods:
* addPromise - the plugin will wait for your resolve then will execute own logic
* addVendorStyle - adding css content to vendor bundle 
* addVendorScript - adding js content to vendor bundle
* addCustomStyles - adding css content to custom bundle
* addCustomScript - adding js content to custom bundle
* addAssetFolder - coping all assets 

All files will copy and merge on 4 files:
* vendor-hash.js
* vendor-hash.css
* custom-hash.js
* custom-hash.css

and move to `public` folder in root project. Also will build a json file `bundle.result.json` for express to include js and css.

### Example
```
myModule.configureFactories(function (AssetManagerConfigurationFactory) {

    AssetManagerConfigurationFactory.addVendorStyle('path to file or mask like ./*.js'));
    
    AssetManagerConfigurationFactory.addVendorScript('path to file or mask like ./*.js'));
    
    AssetManagerConfigurationFactory.addCustomStyles('path to file or mask like ./*.js'));
    
    AssetManagerConfigurationFactory.addCustomScript('path to file or mask like ./*.js'));
    
    AssetManagerConfigurationFactory.addAssetFolder('path to file or mask like ./*.js'));
});
```