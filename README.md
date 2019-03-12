[![npm][npm]][npm-url]
[![node][node]][node-url]
[![deps][deps]][deps-url]
[![tests][tests]][tests-url]
[![size][size]][size-url]

# External-url-loader

A loader for webpack that permit static's usage as externals that make reference to your own package. If those statics exceed the `limit` size you specify, it will be encoded in base64.

The loader will generate a path with a `require` that make reference to the `packageName` you specify.

This is use full when you want to create a library that use statics dependencies.

---

## Getting Started

To begin, you'll need to install external-url-loader:

```console
$ npm install external-url-loader --save-dev
```

This loader provides the same feature as [url-loader](https://github.com/webpack-contrib/url-loader) and extends all url-loader options.

```js
import img from './image.png';
```

```js
// webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                test: /\.(png||jpe?g|gif|svg)$/i,
                use: [
                    {
                        loader: ' external-url-loader',
                        options: {
                            limit: 8192, // url-loader limit
                            packageName: 'library-package-name', // your package name
                            active: process.env.NODE_ENV === 'production', // if you want to enable or disable external-url-loader and fallback on url-loader
                        },
                    },
                ],
            },
        ],
    },
};
```

More over you have to add your own library, and all sub paths as externals in your build process.

**_:warning: Don't put externals in your dev-server process. (you can make another config dedicated to dev-server)_**

```js
// webpack.config.js
module.exports = [
    {
        module:  ...,
        name: 'build',
        externals: [
            new RegExp(`^library-package-name.*$`)
        ]
    },
    {
        module:  ...,
        name: 'dev-server',
    },
];
```

---

## Options

## packageName

Type: `String`
Default: `undefined`

This is your package name that's will use in the generated path.

## active

Type: `Boolean`
Default: `undefined`

If you want to disabled the externals `require` and fallback on `url-loader` (a non production task for example)

## extractCss

Type: `Boolean`
Default: `undefined`

To generate a specific path for extracted css, if you use it with `css-loader` and `MiniCssExtractPlugin` during `production process`. You have to make a specific rule for css issuer and active this option.

**It will generate a path like** `~library-package-name/image.png`

```js
import img from './image.png';
```

```js
// webpack.config.js
module.exports = {
    module: {
        rules: [
            {
                test: /\.(png||jpe?g|gif|svg)$/i,
                issuer: /\.(css|scss|less)$/i,
                use: [
                    {
                        loader: ' external-url-loader',
                        options: {
                            limit: 8192,
                            packageName: 'library-package-name', // your package name.
                            active: process.env.NODE_ENV === 'production', // if you want to enable or disable external-url-loader and fallback on url-loader.
                            extractCss: process.env.NODE_ENV === 'production', // if you want to enable or disable path generation for css extraction.
                        },
                    },
                ],
            },
            {
                test: /\.(png||jpe?g|gif|svg)$/i,
                issuer: /\.(js|jsx|ts|tsx)$/i,
                use: [
                    {
                        loader: 'external-url-loader',
                        options: {
                            limit: 8192,
                            packageName: 'library-package-name', // your package name.
                            active: process.env.NODE_ENV === 'production', // if you want to enable or disable external-url-loader and fallback on url-loader.
                        },
                    },
                ],
            },
        ],
    },
};
```

## others:

All other options come from [url-loader](https://github.com/webpack-contrib/url-loader) option

## Contributing

Please take a moment to read our contributing guidelines if you haven't yet done so.

[CONTRIBUTING](./.github/CONTRIBUTING.md)

## License

[MIT](./.github/LICENCE)

[npm]: https://img.shields.io/npm/v/external-url-loader.svg
[npm-url]: https://npmjs.com/package/external-url-loader
[node]: https://img.shields.io/node/v/external-url-loader.svg
[node-url]: https://nodejs.org
[deps]: https://david-dm.org/easyni/external-url-loader.svg
[deps-url]: https://david-dm.org/easyni/external-url-loader
[tests]: https://img.shields.io/circleci/project/github/easyni/external-url-loader.svg
[tests-url]: https://circleci.com/gh/easyni/external-url-loader
[cover]: https://codecov.io/gh/easyni/external-url-loader/branch/master/graph/badge.svg
[cover-url]: https://codecov.io/gh/easyni/external-url-loader
[chat]: https://img.shields.io/badge/gitter-webpack%2Fwebpack-brightgreen.svg
[chat-url]: https://gitter.im/webpack/webpack
[size]: https://packagephobia.now.sh/badge?p=external-url-loader
[size-url]: https://packagephobia.now.sh/result?p=external-url-loader
