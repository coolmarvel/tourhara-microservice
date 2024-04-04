import { registerAs } from '@nestjs/config';

export default registerAs('wc-stag', () => ({
  url: process.env.STAG_API_URL,
  key: process.env.STAG_CONSUMER_KEY,
  secret: process.env.STAG_CONSUMER_SECRET,
}));
