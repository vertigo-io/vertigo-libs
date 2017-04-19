import builder from 'focus-core/util/url/builder';

const testRoot = './test/error/';

export default {
    loadError: builder(testRoot, 'GET')
};
