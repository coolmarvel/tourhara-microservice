import { registerAs } from '@nestjs/config';

export default registerAs('mariadb', () => ({
  host: process.env.MARIADB_HOST,
  port: parseInt(process.env.MARIADB_PORT, 10),
  database: process.env.MARIADB_DATABASE,
  username: process.env.MARIADB_USERNAME,
  password: process.env.MARIADB_PASSWORD,
}));
