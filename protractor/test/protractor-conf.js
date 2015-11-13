/*
1. Set the property of exports by config
2. 
    specs: Array to one of more file paths that define file groups
    rootElement: fo and find the specific element you want to loot at angular */

exports.config = {
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['*-spec.js'],
    rootElement: 'body'
};
