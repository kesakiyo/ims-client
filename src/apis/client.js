/* External dependencies */
import sf from 'zoyi-simple-fetch';

const client = new sf.Client();

client.setBaseUrl('http://api.nextview.co/v1');
client.setDefaultHeader({
  'Accept': 'application/json',
  'Content-Type': 'application/json'
})
client.credentials = 'include'

export default client;