# superviews.js loader for webpack

## Options

### argstr *(string) (default=undefined)*

same as [superviews.js](https://github.com/davidjamesstone/superviews.js#api)

### mode *(string) (default=cjs)*

same as [superviews.js](https://github.com/davidjamesstone/superviews.js#api)

~~### astring *(object) (default={})*~~

~~same as [Astring](https://github.com/davidbonnet/astring#usage)~~

## Webpack 2 with ES 2015 Module Exports

[export@MDN](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Statements/export)  
[export@ECMAScript 2015 Language Specification](http://www.ecma-international.org/ecma-262/6.0/#sec-exports)

Using [superviews.js](https://github.com/davidjamesstone/superviews.js) with `mode:'es6'`, will convert template to **ES2015 Module**.

template
```HTML
<template name="NAME" args="ARGS"></template>
```

result
```JavaScript
import {patch, elementOpen, elementClose, text, skip, currentElement} from "incremental-dom"

var __target
                                                                                
export function NAME (ARGS) {
                                                                   
}
```

Its not `export default function`. So, you should use as a **ES2015 Module**, not as a function.

```JavaScript
import { NAME as render } from 'superviews-loader?mode=es6!./template.html';
render(ARGS);
```

## with babel-loader

`src/root.html`
```HTML
<template name="render" args="itemlist">
    <div each="item, item.Id in itemlist" style="{...item.style}">
    </div>
</template>
```

`src/index.js`
```JavaScript
import {render} from './root.html';

render([
    { Id:0, style:{ position:'absolute' } }
]);
```

`.babelrc`
```JSON
{
  "presets": [
      ["es2015", { "modules": false }]
    ],
  "plugins": [
      "transform-object-rest-spread"
    ],
}
```

`webpack.config.js`
```JavaScript
var path = require('path');
var root = path.resolve(__dirname, '.')
module.exports = {
  context: root,
  entry: './src/index.js',
  output: {
    path: path.join(root, 'dist'),
    filename: 'index.js',
    publicPath: './',
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          'babel-loader',
          {
            loader: 'superviews-loader',
            options: {
              mode: 'es6'
            }
          }
        ]
      }
    ]
  },
  devtool: 'source-map'
};
```
## Tips
`webpack.config.js`
```JavaScript
var webpack = require('webpack');
module.exports = {
...
  plugins: [
    // because 'dist/incremental-dom-cjs.js' has a sourcemap reference, IE debugger will ignore your source.
    new webpack.NormalModuleReplacementPlugin(/^incremental-dom$/i, 'incremental-dom/index.js')
  ]
```