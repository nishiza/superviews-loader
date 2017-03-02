'use strict';
const loader = require('../dist/superviews-loader');
suite('webpack loader', () => {
    setup(() => {
    });

    suite('loader', () => {
        test('should be finished successfully.', () => {
            const result = loader.loaderMain.bind({
                cacheable: () => {
                },
                loaders: [],
                async: () => {
                    return (arg, result, map) => {

                    };
                },
                options:{
                },
                query: {
                }
            })('<template args=""><div></div></template>');
            console.log(result);
        });

        test('should be finished successfully with mode === "es6".', () => {
            const result = loader.loaderMain.bind({
                cacheable: () => {
                },
                loaders: [],
                async: () => {
                    return (arg, result, map) => {

                    };
                },
                options:{
                },
                query: {
                    mode: 'es6'
                }
            })('<template args=""><div></div></template>');
            console.log(result);
        });
    });
});