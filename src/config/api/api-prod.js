const protocol = "https";
const host = "";
const port = "";
const trailUrl = "/api/v1";

const hostUrl = `${protocol}://${host}${port ? ":" + port : ""}`;
const endpoint = `${protocol}://${host}${port ? ":" + port : ""}${trailUrl}`;

export default {
  endpoint: endpoint,
  hostUrl: hostUrl,
};
