const crypto = require('crypto');
const path = require('path');

function removeExt(file) {
    return file.replace(/\.[^/.]+$/, '');
}

function createHash(str) {
    return crypto.createHash('sha256').update(str).digest('hex').substr(0, 8);
}

function findAlias(inputs, facadeModuleId) {
    return Object.keys(inputs).find((alias) => {
        const entry = inputs[alias];
        return path.resolve(entry) === facadeModuleId;
    });
}

const defaults = {
    mapFileName: 'import-map.json',
    mapDest: undefined,
    baseURL: '/',
    ext: 'js',
    entryFileNames: '[name]',
    chunkFileNames: '[name]',
    hash: true
};

module.exports = function (options) {
    const conf = { ...defaults, ...options };
    let inputs;
    return {
        name: 'import-map',
        options(options) {
            const { input } = options;
            inputs = input;
            return {
                ...options,
                input: Object.values(input)
            };
        },
        outputOptions(options) {
            return {
                ...options,
                entryFileNames: `${conf.entryFileNames}.${conf.ext}`,
                chunkFileNames: `${conf.chunkFileNames}.${conf.ext}`,
            }
        },
        generateBundle(outputOptions, bundle) {
            const imports = {};
            const { hash, mapFileName, baseURL, ext } = conf;
            Object.values(bundle).forEach((chunk) => {
                const { fileName, code, facadeModuleId, isEntry } = chunk;
                if (hash) {
                    const hashedFileName = `${removeExt(fileName)}.${createHash(code)}.${ext}`;
                    chunk.fileName = hashedFileName;
                }
                const dest = `${baseURL}${chunk.fileName}`;
                imports[`${baseURL}${fileName}`] = dest;
                if (isEntry) {
                    const alias = findAlias(inputs, facadeModuleId);
                    imports[alias] = dest;
                }
            });
            this.emitFile({
                type: 'asset',
                source: JSON.stringify({ imports }),
                fileName: mapFileName
            })
        }
    }
}