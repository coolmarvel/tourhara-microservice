import { registerAs } from '@nestjs/config';

export default registerAs('mariadb-prod', () => ({
  host: process.env.MARIADB_PRODUCTION_HOST,
  port: parseInt(process.env.MARIADB_PRODUCTION_PORT, 10),
  database: process.env.MARIADB_PRODUCTION_DATABASE,
  username: process.env.MARIADB_PRODUCTION_USERNAME,
  password: process.env.MARIADB_PRODUCTION_PASSWORD,
}));
