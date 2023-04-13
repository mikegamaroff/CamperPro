/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    COUCHDB_USER: process.env.COUCHDB_USER,
    COUCHDB_PASSWORD: process.env.COUCHDB_PASSWORD,
    COUCHDB_URL: process.env.COUCHDB_URL,
    COUCHDB_PORT: process.env.COUCHDB_PORT,
    COUCHDB_NAME: process.env.COUCHDB_NAME,
  },
};

module.exports = nextConfig;
