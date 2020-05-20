const util = require('util');
const fs = require('fs-extra');
const glob = util.promisify(require('glob'));
const PROJECT = require('@tfg-config/project');

async function getMaps() {
  const mapFiles = await glob(
    `${PROJECT.DIST}/**/${PROJECT.IMPORT_MAP_FILENAME}`
  );
  return Promise.all(mapFiles.map((file) => fs.readJSON(file)));
}

async function buildImportMap() {
  const maps = await getMaps();
  const importMap = {imports: {}};
  for (const map of maps) {
    Object.assign(importMap.imports, map.imports);
  }
  return JSON.stringify(importMap);
}

async function insertImportMap({from, to}) {
  const importMap = await buildImportMap();
  const tmpl = await fs.readFile(from, 'utf8');
  const html = tmpl.replace('${importMap}', importMap);
  await fs.writeFile(to, html);
}

module.exports = {
  insertImportMap,
  buildImportMap,
};
