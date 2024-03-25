import { registerAs } from '@nestjs/config';

export default registerAs('mariadb', () => {
  if (process.env.MARIADB_ENV === 'staging') {
    return {
      host: process.env.MARIADB_STAGING_HOST,
      port: parseInt(process.env.MARIADB_STAGING_PORT, 10),
      database: process.env.MARIADB_STAGING_DATABASE,
      username: process.env.MARIADB_STAGING_USERNAME,
      password: process.env.MARIADB_STAGING_PASSWORD,
    };
  } else if (process.env.MARIADB_ENV === 'production') {
    return {
      host: process.env.MARIADB_PRODUCTION_HOST,
      port: parseInt(process.env.MARIADB_PRODUCTION_PORT, 10),
      database: process.env.MARIADB_PRODUCTION_DATABASE,
      username: process.env.MARIADB_PRODUCTION_USERNAME,
      password: process.env.MARIADB_PRODUCTION_PASSWORD,
    };
  }
});
