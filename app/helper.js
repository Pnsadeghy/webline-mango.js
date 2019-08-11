const { readdirSync } = require('fs');
getDirectories = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
getFiles = source =>
    readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name);
exports.getFiles = getFiles;
exports.getModules = () => {
    return getDirectories('app_modules').filter(i => i !== 'front');
};
exports.paginateResponse = async (query) => {
    const list = await query;
    const count = await query.countDocuments();
    return { data: list, total: count };
};