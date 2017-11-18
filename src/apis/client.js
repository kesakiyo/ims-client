/* External dependencies */
import sf from 'zoyi-simple-fetch';
import moment from 'moment';

const client = new sf.Client();

client.setBaseUrl({
  development: 'http://localhost:3001/v1',
  exp: 'http://api.exp.nextview.co/v1',
  production: 'http://api.nextview.co/v1',
});

client.setDefaultHeader({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
});
client.credentials = 'include';

client.get_no_cache = (url, query = {}) => {
  const now = +moment();
  return client.get(url, { now, ...query });
}

export default client;