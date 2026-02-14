const fs = require('fs').promises;
const path = require('path');

const USERS_FILE = path.join(__dirname, '../data/users.json');

const readUsersFile = async () => {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeUsersFile = async (users) => {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
};

const findAll = async () => {
  return await readUsersFile();
};

const findById = async (id) => {
  const users = await readUsersFile();
  return users.find((u) => String(u.id) === String(id)) || null;
};

const create = async (userData) => {
  const users = await readUsersFile();
  const nextId = users.length === 0 
    ? 1 
    : Math.max(...users.map(u => Number(u.id) || 0)) + 1;
  
  const newUser = {
    id: nextId,
    name: userData.name,
    email: userData.email
  };
  
  users.push(newUser);
  await writeUsersFile(users);
  return newUser;
};

const update = async (id, userData) => {
  const users = await readUsersFile();
  const index = users.findIndex((u) => String(u.id) === String(id));
  
  if (index === -1) return null;
  
  const updatedUser = {
    ...users[index],
    ...userData,
    id: users[index].id
  };
  
  users[index] = updatedUser;
  await writeUsersFile(users);
  return updatedUser;
};

const remove = async (id) => {
  const users = await readUsersFile();
  const index = users.findIndex((u) => String(u.id) === String(id));
  
  if (index === -1) return false;
  
  users.splice(index, 1);
  await writeUsersFile(users);
  return true;
};

module.exports = {
  findAll,
  findById,
  create,
  update,
  remove
};
