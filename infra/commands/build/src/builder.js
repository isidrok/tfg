module.exports = {
  projects: {
    alias: 'p',
    describe: 'projects to build',
    type: 'array',
  },
  libs: {
    alias: 'l',
    describe: 'build project libs',
    type: 'boolean',
    default: false,
  },
  all: {
    alias: 'a',
    describe: 'build all projects and libraries',
    type: 'boolean',
    default: false,
  },
  since: {
    alias: 's',
    describe: 'build changed projects since ref',
    type: 'string',
  },
  watch: {
    alias: 'w',
    describe: 'start the watcher to build projects on changes',
    type: 'boolean',
    default: false,
  },
};
