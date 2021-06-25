const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getPackages']);
roleRights.set(roles[1], [
  'getUsers',
  'manageUsers',
  'getPackages',
  'managePackages',
]);

module.exports = {
  roles,
  roleRights,
};
