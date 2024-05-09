const mysql = require('mysql');
const config = require('../config/config');

const db = mysql.createConnection(config.db);

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  console.log('Connected to MySQL database');
});

const Task = {
  getAll: (callback) => {
    db.query('SELECT * FROM tasks', callback);
  },
  create: (newTask, callback) => {
    db.query('INSERT INTO tasks SET ?', newTask, callback);
  },
  update: (id, updatedTask, callback) => {
    db.query('UPDATE tasks SET ? WHERE id = ?', [updatedTask, id], callback);
  },
  delete: (id, callback) => {
    db.query('DELETE FROM tasks WHERE id = ?', id, callback);
  },
  getCount: (callback) => {
    db.query('SELECT COUNT(*) AS count FROM tasks', callback);
  }
};

module.exports = Task;
