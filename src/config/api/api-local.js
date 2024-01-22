const protocol = 'http';
const host = 'localhost';
const port = '4040';
const trailUrl = '/api/v1';

const hostUrl = `${protocol}://${host}${port ? ':' + port : ''}`;
const endpoint = `${protocol}://${host}${port ? ':' + port : ''}${trailUrl}`;

export default {
  endpoint: endpoint,
  hostUrl: hostUrl,
};
