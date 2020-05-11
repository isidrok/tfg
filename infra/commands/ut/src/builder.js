
module.exports = {
    project: {
        alias: 'p',
        describe: 'project to test',
        type: 'string',
        required: true
    },
    watch: {
        alias: 'w',
        describe: 'rerun tests on project changes',
        type: 'boolean',
        default: false
    }
};
