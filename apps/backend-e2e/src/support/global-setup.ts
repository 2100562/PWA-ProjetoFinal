import { spawn } from 'child_process';

module.exports = async function () {
  console.log('\nSetting up...\n');

  globalThis.__SERVER_PROCESS__ = await new Promise((resolve, reject) => {
    const server = spawn('nx', ['run', 'backend:serve'], {
      shell: true,
      stdio: 'pipe',
    });

    server.stdout.on('data', (data) => {
      process.stdout.write(`${data}\n`);
      if (
        data
          .toString()
          .includes('Application is running on: http://localhost:3000/api')
      ) {
        resolve(server);
      }
    });

    server.stderr.on('data', (data) => {
      process.stderr.write(`${data}\n`);
    });

    server.on('error', (err) => {
      reject(`Backend error: ${err}`);
    });
  });
};
