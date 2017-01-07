'use strict';
const loader = require('../dist/superviews-loader');
suite('webpack loader', () => {
    setup(() => {
    });

    suite('loader', () => {
        test('should be finished successfully.', () => {
            const result = loader.loaderMain.bind({
                cacheable: () => {},
                options: { }
            })('<template args=""><div></div></template>');
        });
    });
});