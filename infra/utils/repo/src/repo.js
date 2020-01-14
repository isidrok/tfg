const getMonorepoPackages = require('get-monorepo-packages');
const PROJECT  = require('@tfg-config/project');

const packages = getAllPackages();

function getAllPackages() {
    return getMonorepoPackages(PROJECT.ROOT)
        .reduce((packages, { package, location }) => {
            const { name } = package;
            packages[name] = { ...package, location };
            return packages;
        }, {});
}

function getPackage(name) {
    return packages[name];
}

function removeScope(projectName){
    return projectName.replace(`@${PROJECT.MODULE_NAMESPACE}-`,'')
}

function getProjects() {
    return Object.keys(packages)
}

function isClientProject(name){
    return PROJECT.CLIENT_NAMESPACES.some((scope) => name.startsWith(`@${scope}/`));
}

function getClientProjects() {
    return getProjects().filter(isClientProject);
}

function getClientDeps() {
    const deps = getClientProjects().map((name) => {
        const package = packages[name];
        return Object.keys(package.dependencies);
    }).flat();
    return [...new Set(deps)];
}

function getExternalDeps(){
    return getClientDeps().filter((dep) => !PROJECT.BUNDLED_LIBS.includes(dep))
}

function getDepsToBuild(){
    return getExternalDeps().filter((dep) => !isClientProject(dep))
}

function getLocations(projects) {
    return Object.keys(packages)
        .filter((name) => projects.includes(name))
        .map((name) => getPackage(name).location)
}

function getProjectByLocation(location) {
    return Object.keys(packages)
        .find((name) => {
            const package = packages[name];
            return package.location === location;
        })
}

module.exports = {
    packages,
    getPackage,
    removeScope,
    getProjects,
    getClientProjects,
    getClientDeps,
    getExternalDeps,
    getDepsToBuild,
    getLocations,
    getProjectByLocation
};