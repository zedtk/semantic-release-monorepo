const { getProjectRoot, getProjectName } = require('./dotnet-pkg-info');
const plugin = require('./core/plugin');

module.exports = await plugin(getProjectRoot, getProjectName);