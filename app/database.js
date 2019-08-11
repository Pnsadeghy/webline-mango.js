const mongoose = require('mongoose');
const { getModules, getFiles } = require('@app/helper');
let connection;

exports.init = async () => {
    connection = await mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
    console.log('connect to mango');
    getModules().forEach(function (key) {
        getFiles('app_modules/' + key + '/models').forEach(function (file) {
           const data = require(`@module/${key}/models/${file.replace('.js', '')}`);
           data.set(connection.model(data.name, data.schema));
        });
    });
};
exports.connection = () => connection;