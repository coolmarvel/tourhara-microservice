import { registerAs } from '@nestjs/config';

export default registerAs('wc', () => ({
  url: process.env.API_URL,
  key: process.env.CONSUMER_KEY,
  secret: process.env.CONSUMER_SECRET,
}));
