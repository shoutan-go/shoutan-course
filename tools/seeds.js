import knex from 'knex';
import models from '../src/data/models';
import { databaseUrl } from '../src/config';

function seeds() {
  return models.sync().then(() => {
    if (databaseUrl.startsWith('sqlite')) {
      const config = {
        dialect: 'sqlite3',
        connection: {
          filename: databaseUrl.substr(databaseUrl.indexOf(':') + 1),
        },
      };
      return knex(config).seed.run(config);
    }
    return true;
  });
}

export default seeds;
