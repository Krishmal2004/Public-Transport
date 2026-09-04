import app from './app.js';
import { connectDB, initDB } from './config/db.js';
import { PORT } from './config/env.js';

const startServer = async () => {
  await connectDB();
  await initDB();

  app.listen(PORT, () => {
    const host = process.env.WEBSITE_HOSTNAME 
      ? `https://${process.env.WEBSITE_HOSTNAME}` 
      : `http://localhost:${PORT}`;
    console.log(`Server running on ${host}`);
  });
};

startServer();
