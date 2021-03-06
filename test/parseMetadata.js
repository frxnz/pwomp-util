require('./common/bootstrap');

const fs = require('fs-extra');
const test = require('ava');
const getViewsSync = require('../lib/getViewsSync');
const parseMetadata = require('../lib/parseMetadata');

test('parse data', t => {

    const file = getViewsSync('./src/views')[0];
    const content = fs.readFileSync(file, 'utf-8');
    const metadata = parseMetadata(content.match(/^---[\s\S]*---/));
    const metadata2 = parseMetadata();

    t.true('title' in metadata);
    t.is(metadata.title, 'Test 1');
    t.falsy(Object.keys(metadata2).length);

});

test('parse data with layout', t => {
    
        const file = getViewsSync('./src/views')[0];
        const content = fs.readFileSync(file, 'utf-8');
        const metadata = parseMetadata(content.match(/^---[\s\S]*---/), true);
    
        t.true('layout' in metadata);
        t.is(metadata.layout, 'main');
    
    });