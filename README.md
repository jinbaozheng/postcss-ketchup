[PostCSS]: https://github.com/postcss/postcss
[ci-img]:  https://travis-ci.org/cuppi/postcss-ketchup.svg
[ci]:      https://travis-ci.org/cuppi/postcss-ketchup
[CSS]:     https://developer.mozilla.org/zh-CN/docs/Web/CSS
[Icon]:    http://i-film-beta.oss-cn-shanghai.aliyuncs.com/framework/postcss-ketchup/ketch-icon.png
[postcss-loader]: https://github.com/postcss/postcss-loader
# PostCSS Ketchup [![Build Status][ci-img]][ci]
[PostCSS] plugin for use [CSS] more happy and more comfortable.

<img align="right" width="95" height="95"
	title="Philosopher’s stone, logo of PostCSS"
	src="http://i-film-beta.oss-cn-shanghai.aliyuncs.com/framework/postcss-ketchup/ketch-icon.png">

## Getting Started
First thing's first, install the module:
```bash
yarn add postcss-ketchup --dev
```
or
```bash
npm install postcss-ketchup --save-dev
```


## Usage

### config
It's easy to get config.

when use postcss-cli:
```javascript
var ketchup = require('postcss-ketchup')({
	digits: 2,
    designWidth: 375,
    ignoreDecl: [
        'font-size'
    ]
});
var autoprefixer = require('autoprefixer');
postcss([ autoprefixer, ketchup ]).process(source, { ketchup: ketchup }).then(function (result) {
	// An alias for the result.css property. Use it with syntaxes that generate non-CSS output.
	result.content
});
```

when use <a href=https://webpack.docschina.org/concepts/loaders/>webpack</a>, more info to [postcss-loader]:
```javascript
module.exports = {
  plugins: {
    'postcss-ketchup': {}
  }
}
```

If you happen to use Vue-Cli3, you can edit css.loaderOptions.postcss in vue.config.js file
for:
```javascript
{
    ...,
    postcss: {
        plugins:[
            require('postcss-ketchup')()
        ]
    }
}
```

### process

input
```css
@px2vw(ignoreDecl: margin-top padding, digits: 5);
.hello-ketchup{
    background: red;
    font-size: 100px;
    padding: 50px;
    margin-top: 20px;
    height: 100px;
}
```
> px2vw's params will ignore declaration margin-top and padding prop when convert px to vw, 
and it will exactly keep five decimals, view more config to [Config](#config) 
.(Do not forget semi-colon in the end)

output
```css
.hello-ketchup{
    background: red;
    font-size: 100px;
    padding: 50px;
    margin-top: 20px;
    height: 26.66667vw;
}
```

## <span id="config">Config</span>
These are the available config options for config ketchup. Also visible in the at-rule params.

```javascript
{
     // the accuracy of floating-point arithmetic during unit conversion 
     digits: 2,
     //  the width of the UI design  
     designWidth: 375,
     //  the declaration should ignore during process css
     ignoreDecl: [
         'font-size'
     ],
     //  the declaration must consider during process css
     forceDecl: []
}
```
