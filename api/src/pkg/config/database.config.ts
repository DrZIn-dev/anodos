import { registerAs } from '@nestjs/config';

export default registerAs('database', () => ({
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT || 5432,
  db: process.env.POSTGRES_DB || 'postgres',
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || '',
  sync:
    process.env.MODE === 'production'
      ? false
      : String(process.env.POSTGRES_SYNC) === 'true',
  drop:
    process.env.MODE === 'production'
      ? false
      : String(process.env.POSTGRES_DROP) === 'true',
  logging:
    process.env.MODE === 'production'
      ? false
      : String(process.env.POSTGRES_LOGGING) === 'true',
}));
