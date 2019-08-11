let model = null;
exports.name = 'users';
exports.schema = {
  name: String
};
exports.set = m => model = m;
exports.model = () => model;