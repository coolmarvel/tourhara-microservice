import { registerAs } from '@nestjs/config';

export default registerAs('mariadb', () => ({
  host: process.env.MARIADB_HOST,
  port: Number(process.env.MARIADB_PORT),
  database: process.env.MARIADB_DATABASE,
  username: process.env.MARIADB_USERNAME,
  password: process.env.MARIADB_PASSWORD,
}));
