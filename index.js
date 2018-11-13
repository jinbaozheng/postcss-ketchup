const postcss = require('postcss');
const valueParser = require('postcss-value-parser');

const hasLineIgnoreComment = (node, text) => {
    return node && node.prev() && node.prev().type === 'comment' && node.prev().text === text;
}

module.exports = postcss.plugin('postcss-ketchup', function (opts) {
    opts = opts || {};
    // Work with options here
    return function (root, result) {
        root.walkAtRules('px2vw', (atrule) => {
            let rule = atrule.next();
            if (rule && rule.type === 'rule'){
                rule.walkDecls((decl) => {
                    if (/^.*px$/.test(decl.value)) {
                        let prop = decl.prop;
                        let value = decl.value;
                        if (!hasLineIgnoreComment(decl, 'px2vw-ignore-next-line')) {
                            let number = Number(valueParser.unit(value).number)/375;
                            if (isNaN(number)) {
                                throw rule.error(`Unknown variable ${value}`, { word: value });
                            }
                            decl.value = `${number}'vw'`;
                        } else {
                            //  pass
                        }
                    }
                })
            }
            atrule.remove();
        });
    };
});
