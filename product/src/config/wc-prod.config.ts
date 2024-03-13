import { registerAs } from '@nestjs/config';

export default registerAs('wc-prod', () => ({
  url: process.env.PROD_API_URL,
  key: process.env.PROD_CONSUMER_KEY,
  secret: process.env.PROD_CONSUMER_SECRET,
}));
