const postcss = require('postcss');
const valueParser = require('postcss-value-parser');
const {union} = require('lodash/array');
const {mergeWith} = require('lodash/object');

const hasLineIgnoreComment = (node, text) => {
    return node && node.prev() && node.prev().type === 'comment' && node.prev().text === text;
}

const merge = (a, b) => {
    return mergeWith(a, b, (objValue, srcValue, key, object, source, stack) => {
        if (Array.isArray(objValue) && Array.isArray(srcValue)){
            return union(objValue, srcValue)
        }
        return undefined;
    })
}

const getObjFromAtRuleParams = (params, callback = (p, v) => {return {p, v}}) => {
    if (params && /^\(.*\)$/.test(params)) {
        try {
            let paramString = params.match(/^\((.*)\)$/)[1].replace(/^\s*|\s*$/g, '');
            if (/(\w+):((\s)*\w+)(,?)/g.test(paramString)){
                let paramList = paramString.split(',')
                let obj = {};
                paramList.forEach(_ => {
                    let decl = callback(_.split(':')[0].replace(/^\s*|\s*$/g, '').replace(/(\s+)/g, ' '),
                        _.split(':')[1].replace(/^\s*|\s*$/g, '').replace(/(\s+)/g, ' '))
                    obj[decl.p] = decl.v;
                })
                return obj;
            }
        } catch (e) {
            throw new Error('AtRule: 参数解析失败');
        }
    }
    return null;
}
module.exports = postcss.plugin('postcss-ketchup', function (opts) {
    let m_opts = merge({
        digits: 2,
        designWidth: 375,
        ignoreDecl: [
            'font-size'
        ],
        forceDecl: []
    }, opts || {});
    return function (root, result) {
        root.walkAtRules('px2vw', (atrule) => {
            let at_opts = getObjFromAtRuleParams(atrule.params, (p, v) => {
                if (~['ignoreDecl', 'forceDecl'].indexOf(p)) {
                    return {
                        p: p,
                        v: v.split(' ') || []
                    }
                }
                return {p, v}
            });
            let subopts = merge(m_opts, at_opts);
            let {digits, designWidth, ignoreDecl, forceDecl} = subopts;
            let rule = atrule.next();
            if (rule && rule.type === 'rule'){
                rule.walkDecls((decl) => {
                    if (/^.*px$/.test(decl.value)) {
                        let prop = decl.prop;
                        let value = decl.value;
                        if (!~ignoreDecl.indexOf(prop) || ~forceDecl.indexOf(prop)){
                            if (!hasLineIgnoreComment(decl, 'px2vw-ignore-next-line')) {
                                let number = Number(valueParser.unit(value).number)/designWidth*100;
                                if (isNaN(number)) {
                                    throw rule.error(`Unknown variable ${value}`, { word: value });
                                }
                                decl.value = `${number.toFixed(digits)}vw`;
                            } else {
                                //  pass
                            }
                        }
                    }
                })
            }
            atrule.remove();
        });
    };
});

