import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@email.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'John Doe',
    email: 'john@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Margott Robbie',
    email: 'jane@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Daniil Safonov',
    email: 'dany@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Arina Ptrsh',
    email: 'ari@email.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
