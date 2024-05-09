const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors());
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.redirect('/api/tasks');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
