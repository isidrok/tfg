module.exports = function deps(config) {
  const {dependencies, externals} = config;
  return {
    name: 'deps',
    async resolveId(source, importer) {
      if (!importer || source.startsWith('.') || source.startsWith('\0')) {
        return null;
      }
      const isExternal =
        externals.includes(source) ||
        externals.some((ext) => source.startsWith(`${ext}/`));
      const isDep = dependencies.includes(source);
      const isNestedDep = dependencies.some((dep) => {
        return source.startsWith(`${dep}/`);
      });
      if (!isDep && !isNestedDep) {
        this.error(`${source} is not included in package dependencies`);
        return;
      }
      if (isExternal) {
        return false;
      }
      return null;
    },
  };
};
