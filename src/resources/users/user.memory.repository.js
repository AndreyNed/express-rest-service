const User = require('./user.model');

const getAll = async () =>
  // TODO: mock implementation. should be replaced during task development
   [
     {
       id: 'user1',
       name: 'First User',
       login: 'First',
       password: 'password1',
     },
     {
       id: 'user2',
       name: 'Second User',
       login: 'Second',
       password: 'password2',
     },
     {
       id: 'user3',
       name: 'Third User',
       login: 'Third',
       password: 'password3',
     },
     {
       id: 'user4',
       name: 'Fourth User',
       login: 'Fourth',
       password: 'password4',
     },
     {
       id: 'user5',
       name: 'Fifth User',
       login: 'Fifth',
       password: 'password5',
     },
   ]
;

const getUser = async userId => {
  const users = await getAll();
  const user = users.find(({ id }) => id === userId);
  if (!user) {
    throw Object.create({ status: 404, message: 'User not found' });
  }

  return user;
};

const create = async ({ name, login, password }) => new User({ name, login, password });

const update = async ({ id, name, login, password }) => {
  await getUser(id);

  return new User({ id, name, login, password });
}



const deleteUser = async userId => {
  await getUser(userId);

  return true;
};

module.exports = { getAll, create, update, getUser, deleteUser };
