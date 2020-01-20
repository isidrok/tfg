const util = require('util');
const fs = require('fs-extra');
const glob = util.promisify(require('glob'));
const PROJECT  = require('@tfg-config/project');

async function getMaps() {
    const mapFiles = await glob(`${PROJECT.DIST}/**/${PROJECT.IMPORT_MAP_FILENAME}`);
    return Promise.all(mapFiles.map((file) => fs.readJSON(file)));
}

async function buildImportMap() {
    const maps = await getMaps();
    const importMap = { imports: {} };
    for (const map of maps) {
        Object.assign(importMap.imports, map.imports)
    }
    return JSON.stringify(importMap);
}

async function insertImportMap() {
    const importMap = await buildImportMap();
    const tmpl = await fs.readFile(PROJECT.TEMPLATE_HTML, 'utf8');
    const html = tmpl.replace('${importMap}', importMap);
    await fs.writeFile(PROJECT.INDEX_HTML, html);
}

module.exports = insertImportMap;