const Task = require('../models/Task');

const taskController = {
  getAllTasks: (req, res) => {
    Task.getAll((err, tasks) => {
      if (err) {
        console.error('Error fetching tasks:', err);
        return res.status(500).json({ error: 'Error fetching tasks' });
      }
      res.json(tasks);
    });
  },
  createTask: (req, res) => {
    const newTask = req.body;
    Task.create(newTask, (err, result) => {
      if (err) {
        console.error('Error adding task:', err);
        return res.status(500).json({ error: 'Error adding task' });
      }
      res.status(201).json({ message: 'Task added successfully' });
    });
  },
  updateTask: (req, res) => {
    const taskId = req.params.id;
    const updatedTask = req.body;
    Task.update(taskId, updatedTask, (err, result) => {
      if (err) {
        console.error('Error updating task:', err);
        return res.status(500).json({ error: 'Error updating task' });
      }
      res.json({ message: 'Task updated successfully' });
    });
  },
  deleteTask: (req, res) => {
    const taskId = req.params.id;
    Task.delete(taskId, (err, result) => {
      if (err) {
        console.error('Error deleting task:', err);
        return res.status(500).json({ error: 'Error deleting task' });
      }
      res.json({ message: 'Task deleted successfully' });
    });
  },
  getCount: (req, res) => {
    Task.getCount((err, result) => {
      if (err) {
        console.error('Error fetching count:', err);
        return res.status(500).json({ error: 'Error fetching count' });
      }
      res.json({ count: result[0].count });
    });
  }
};

module.exports = taskController;
