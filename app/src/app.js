const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./config/db');
const salesRouter = require('./routes/sales.route');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/sales', salesRouter);

// Start server & DB connection
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected & synced successfully');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to start server', err);
    process.exit(1);
  }
})();
