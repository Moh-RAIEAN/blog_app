import { connect } from 'mongoose';
import { Server } from 'node:http';
import app from './app';
import getConfigOption from './app/config';

const port = getConfigOption('port');
const databaseUrl = getConfigOption('databaseUrl');
let server: Server;

async function startServer() {
  await connect(databaseUrl);
  server = app.listen(port, () =>
    console.log(`🟢 server is running on:- ${port} port ^_^`),
  );
}

startServer().catch((err) => console.log(err));

process.on('unhandledRejection', (error) => {
  console.log(error);

  console.log('🔴 unhandledRejection detected X_X, closing server....');

  if (server) {
    server.close();
    process.exit(1);
  }
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.log(error);

  console.log('🔴 uncaughtException detected X_X, closing server....');
  process.exit(1);
});
