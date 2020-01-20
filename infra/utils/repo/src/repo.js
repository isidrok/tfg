const getMonorepoPackages = require('get-monorepo-packages');
const PROJECT = require('@tfg-config/project');

const repoManager = {
    get packages() {
        const pkgs = [];
        for(let {package, location} of getMonorepoPackages(PROJECT.ROOT)){
            pkgs.push({...package, location})
        }
        return pkgs;
    },
    get projects() {
        return this.packages.map((package) => package.name);
    },
    get clientPackages(){
        return this.packages.filter((package) => this.isClientProject(package.name));
    },
    get clientProjects(){
        return this.projects.filter(this.isClientProject);
    },
    get clientDeps(){
        const deps = this.clientPackages.map((package) => {
            return Object.keys(package.dependencies);
        }).flat();
        return [...new Set(deps)];
    },
    get externalDeps(){
        return this.clientDeps.filter((dep) => !PROJECT.BUNDLED_LIBS.includes(dep)).concat(PROJECT.LIB_IMPORTS);
    },
    get libs(){
        return this.externalDeps.filter((dep) => !this.isClientProject(dep)).concat(PROJECT.LIB_IMPORTS);
    },
    get clientLocations(){
        return this.clientPackages.map((package) => package.location);
    },
    findProjectByLocation(location) {
        return this.packages.find((package) => {
            return package.location === location;
        }).name;
    },
    findPackage(name) {
        return this.packages.find((package) => package.name === name);
    },
    normalize(name) {
        return name.replace(`@${PROJECT.MODULE_NAMESPACE}-`, '')
    },
    isClientProject(name) {
        return PROJECT.CLIENT_NAMESPACES.some((ns) => name.startsWith(`@${ns}/`));
    }
}

module.exports = repoManager;