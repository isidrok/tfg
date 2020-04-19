const { createFilter } = require('@rollup/pluginutils');


const defaults = {
    include: ['**/*.css'],
    exclude: [],
};

module.exports = function cssModules(userConfig) {
    const config = Object.assign({}, defaults, userConfig);
    const { include, exclude } = config;
    const shouldProcess = createFilter(include, exclude);
    return {
        name: 'css-modules',
        transform(code, id) {
            if (!shouldProcess(id)) {
                return null;
            }
            return {
                code: cssModule(code),
                map: null
            };
        },
    };
};

function cssModule(source) {
    // TODO: only export stylesheet when lit element supports them
    return `
        const styleSheet = new CSSStyleSheet();
        styleSheet.replaceSync(${JSON.stringify(source)});
        export default {styleSheet:styleSheet};
    `
}