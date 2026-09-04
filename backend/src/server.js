import app from './app.js';
import { connectDB, initDB } from './config/db.js';
import { PORT } from './config/env.js';

const startServer = async () => {
  await connectDB();
  await initDB();

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
};

startServer();
