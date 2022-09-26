import { Sequelize } from 'sequelize';

const connection = new Sequelize({
  dialect: 'mariadb',
  host: 'localhost',
  username: 'root',
  password: 'root',
  database: 'sequelize',
  logging: false,
});

export default connection;
