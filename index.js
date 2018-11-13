const postcss = require('postcss');
const valueParser = require('postcss-value-parser');
module.exports = postcss.plugin('postcss-ketchup', function (opts) {
    opts = opts || {};
    // Work with options here
    return function (root, result) {
        root.walkAtRules('px2vw', (rule) => {
            rule.next().replaceValues(/^.*px$/, (string) => {
                let number = Number(valueParser.unit(string).number)/375;
                if (isNaN(number)) {
                    throw rule.error('Unknown variable ' + string, { word: string });
                }
                return number + 'vw';
            })
            rule.remove();
        });
    };
});
