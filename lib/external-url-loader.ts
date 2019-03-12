import { getOptions } from 'loader-utils';
import validateOptions from 'schema-utils';
import urlLoader from 'url-loader';
import { loader } from 'webpack';
import schema from './options.json';

// tslint:disable-next-line:no-default-export
export default function(this: loader.LoaderContext, source: string | Buffer) {
    const options = getOptions(this) || {};

    validateOptions(schema, options, 'External URL Loader');

    let fallbackLoaderContext: loader.LoaderContext;

    fallbackLoaderContext = { ...this, query: options };
    const outputUrlLoader = urlLoader.call(fallbackLoaderContext, source);

    if (options.active) {
        const extractedUrlLoaderContent = `${outputUrlLoader}`.match(/(?<=module\.exports\ =\ ['"]).*(?=['"];)/);
        if (
            extractedUrlLoaderContent &&
            extractedUrlLoaderContent.length === 1 &&
            !extractedUrlLoaderContent[0].match(/base64/)
        ) {
            if (options.extractCss) {
                return `module.exports = "~${options.packageName}/${extractedUrlLoaderContent[0]}";`;
            }
            return `module.exports = require("${options.packageName}/${extractedUrlLoaderContent[0]}");`;
        }
    }

    return outputUrlLoader;
}

export const raw = true;
