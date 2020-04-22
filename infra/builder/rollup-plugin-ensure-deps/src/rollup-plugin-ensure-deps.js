module.exports = function ensureDeps(config) {
    const { dependencies, externals} = config;
    return {
        name: 'ensure-deps',
        resolveId(source) {
            const isExternal = externals.includes(source);
            const isDep = dependencies.includes(source);
            const isNestedDep = dependencies.some((dep) => {
                return source.startsWith(`${dep}/`)
            });
            const isInDeps = isDep || isNestedDep;
            if(isExternal && isInDeps){
                return false;
            }
            if(isExternal && !isInDeps){
                this.error(`${source} is not included in package dependencies`);
                return;
            }
            return null;
        }
    };
};