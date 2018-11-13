module.exports = {
    root: true,
    env: {
        node: true,
        es6: true
    },
    'extends': [
        'eslint:recommended'
    ],
    rules: {
        'no-console': 'off',
        'no-debugger': 'off',
        "no-constant-condition": 1,
        "no-extend-native": "off",
        "no-new": 'off',
        "no-fallthrough": 'off',
        "no-unreachable": 1,
        "no-unused-vars": 0,
        "key-spacing": 'off',
        // 语句强制分号结尾
        "semi": 'off',
        'space-before-blocks': 'off',
        'space-before-function-paren': 'off',
        'indent': 'off',
        // allow paren-less arrow functions
        'arrow-parens': 1,
        // allow async-await
        'generator-star-spacing': 'off',
        'no-undef': 'off',
        'space-infix-ops': 0
    }
}
