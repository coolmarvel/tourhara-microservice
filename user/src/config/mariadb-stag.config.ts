import { registerAs } from '@nestjs/config';

export default registerAs('mariadb-stag', () => ({
  host: process.env.MARIADB_STAGING_HOST,
  port: parseInt(process.env.MARIADB_STAGING_PORT, 10),
  database: process.env.MARIADB_STAGING_DATABASE,
  username: process.env.MARIADB_STAGING_USERNAME,
  password: process.env.MARIADB_STAGING_PASSWORD,
}));
