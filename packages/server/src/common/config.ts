import path from 'path';

import dotenvSafe from 'dotenv-safe';
import envVar from 'env-var';

const cwd = process.cwd();

const root = path.join.bind(cwd);

const isProduction = process.env.NODE_ENV === 'production';
const isCI = process.env.CI;

dotenvSafe.config({
  allowEmptyValues: !isProduction,
  path: root('.env'),
  sample: root(isCI ? '.env.ci.example' : '.env.example'),
});

export const GRAPHQL_PORT = envVar
  .get('GRAPHQL_PORT')
  .default(5001)
  .asPortNumber();
export const MONGO_URL = envVar
  .get('MONGO_URL')
  .required(isProduction)
  .asString();

export const JWT_SECRET = envVar
  .get('JWT_SECRET')
  .default('SECRET')
  .required(isProduction)
  .asString();

export const MAILGUN_API_KEY = envVar
  .get('MAILGUN_API_KEY')
  .default('FAKE_KEY')
  .required(isProduction)
  .asString();

export const MAILGUN_DOMAIN = envVar
.get('MAILGUN_DOMAIN')
.default('')
.required(isProduction)
.asString();
