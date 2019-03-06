import { readFileSync } from 'fs';
import { parse as parseUrl, URL } from 'url';
import sequelize from 'sequelize';

// Slack configuration
export interface SlackConfig {
  verificationToken: string;
  apiUrl?: string; // when undefined, the default value is implied: https://slack.com/api/
  subdomain?: string; // when undefined, the hostname has no subdomain: slack.com
  tlsCa?: string; // may be used for numbered dev instances
}

export const slack: SlackConfig = {
  verificationToken: process.env.SLACK_VERIFICATION_TOKEN as string,
};
// tslint:disable-next-line:strict-boolean-expressions
if (process.env.SLACK_API_URL) {
  slack.apiUrl = process.env.SLACK_API_URL;
  // when the hostname ends in .slack.com, then a subdomain might contain a specific environment
  const apiUrl = new URL(slack.apiUrl);
  const match = /^(.*).slack.com$/g.exec(apiUrl.hostname);
  if (match !== null) {
    slack.subdomain = match[1];
  }
}
// tslint:disable-next-line:strict-boolean-expressions
if (process.env.SLACK_CLIENT_CA_PATH) {
  slack.tlsCa = readFileSync(process.env.SLACK_CLIENT_CA_PATH as string, { encoding: 'utf-8' });
}

// OAuth configuration
export interface SlackOAuthConfig {
  clientId: string;
  clientSecret: string;
}

export const slackOAuth: SlackOAuthConfig = {
  clientId: process.env.SLACK_CLIENT_ID as string,
  clientSecret: process.env.SLACK_CLIENT_SECRET as string,
};

// Command configuration
export const slashCommands = {
  root: 'sdt',
  docs: 'docs',
  help: 'help',
  testWebhook: 'test_webhook',
};

export interface StatsDConfig {
  prefix: string;
  debug?: boolean; // Defaults to false
}
// StatsD configuration
export const statsdConfig: StatsDConfig = {
  prefix: 'sdt',
};

// tslint:disable-next-line:strict-boolean-expressions
if (process.env.STATSD_DEBUG) {
  statsdConfig.debug = true;
}

// Model configuration
export const sequelizeConfig: sequelize.Options = {
  dialect: 'mysql',
  logging: false,
};
const databaseUrl = process.env.CLEARDB_DATABASE_URL;
// tslint:disable-next-line:strict-boolean-expressions
if (databaseUrl) {
  // when the DATABASE_URL is defined, parse it for individual values
  const parsedDatabaseUrl = parseUrl(databaseUrl);
  sequelizeConfig.host = parsedDatabaseUrl.hostname;
  // tslint:disable-next-line:strict-boolean-expressions
  sequelizeConfig.port = parsedDatabaseUrl.port ? parseInt(parsedDatabaseUrl.port, 10) : 3306;
  sequelizeConfig.database = parsedDatabaseUrl.pathname!.substr(1);
// tslint:disable-next-line:strict-boolean-expressions
  sequelizeConfig.username = parsedDatabaseUrl.auth ?
    parsedDatabaseUrl.auth.substr(0, parsedDatabaseUrl.auth.indexOf(':')) : undefined;
// tslint:disable-next-line:strict-boolean-expressions
  sequelizeConfig.password = parsedDatabaseUrl.auth ?
    parsedDatabaseUrl.auth.substring(parsedDatabaseUrl.auth.indexOf(':') + 1) : undefined;
} else {
  sequelizeConfig.host = process.env.DB_HOSTNAME;
  // tslint:disable-next-line:strict-boolean-expressions
  sequelizeConfig.port = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;
  sequelizeConfig.database = process.env.DB_NAME;
  sequelizeConfig.username = process.env.DB_USERNAME;
  sequelizeConfig.password = process.env.DB_PASSWORD;
}

// sequelize-cli will look for these named exports for configuration, based on the value of NODE_ENV
export const development = sequelizeConfig;
export const production = sequelizeConfig;

export default {
  slashCommands,
  development,
  production,
};
