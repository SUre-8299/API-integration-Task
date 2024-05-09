module.exports = {
  db: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'QWer1234',
    database: process.env.DB_DATABASE || 'my_database'
  }
};
