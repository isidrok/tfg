const fs = require('fs-extra');
const path = require('path');
const { minify } = require('html-minifier');

const defaults = {
    input: 'index.html',
    dest: 'index.html',
    basePath: undefined,
    minify: {},
}

const placeholders = {
    scripts: '${scripts}',
    preload: '${preload}'
}

module.exports = function entry(options) {
    const conf = { ...defaults, ...options };
    return {
        name: 'entry',
        async generateBundle(outputOptions, bundle) {
            const sources = getSources(outputOptions, bundle, conf);
            let html = await fs.readFile(conf.input, 'utf8');
            html = html.replace(placeholders.scripts, getScripts(sources));
            html = html.replace(placeholders.preload, getPreloads(sources));
            html = minify(html, conf.minify);
            // TODO: use this.emitFile when it supports paths outside dir
            await fs.writeFile(conf.dest, html);
        },
    };
};

function getSources(outputOptions, bundle, conf) {
    const entries = Object.values(bundle).filter((file) => file.isEntry);
    const dest = outputOptions.dir.replace(conf.basePath, '');
    return entries.map((entry) => path.posix.join(dest, entry.fileName));
}

function getScripts(sources) {
   return sources.map((src) => `<script src="${src}"></script>`).join('');
}

function getPreloads(sources) {
    return sources.map((src) => `<link rel="preload" as="script" href="${src}">`).join('');
 }