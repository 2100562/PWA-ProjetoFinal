import { spawn } from 'child_process';
import axios from 'axios';
import mongoose, { Document, Model, Schema } from 'mongoose';
import * as bcrypt from 'bcrypt';

interface IUser extends Document {
  username: string;
  password: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema, 'users');

module.exports = async function () {
  console.log('\nSetting up...\n');

  await new Promise((resolve, reject) => {
    const docker = spawn(
      'docker',
      ['compose', '-f', 'docker-compose.yaml', 'up'],
      {
        shell: true,
        stdio: 'pipe',
      },
    );

    docker.stdout.on('data', (data) => {
      process.stdout.write(`${data}\n`);
      if (
        data
          .toString()
          .includes('"ctx":"initandlisten","msg":"mongod startup complete"')
      ) {
        resolve(docker);
      }
    });

    docker.on('error', (err) => {
      reject(`Docker error: ${err}`);
    });
  });

  const uri =
    'mongodb://root:root@localhost:27017/questionarios?authSource=admin';
  await mongoose.connect(uri);

  const testLecturerUser = new User({
    username: 'testLecturerUser',
    password: await bcrypt.hash('testLecturerUser', 11),
    role: 'lecturer',
  });

  const testStudentUser = new User({
    username: 'testStudentUser',
    password: await bcrypt.hash('testStudentUser', 11),
    role: 'student',
  });

  await testLecturerUser.save();
  await testStudentUser.save();

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

  globalThis.__LECTURER_TOKEN__ = (
    await axios.post(`http://localhost:3000/api/auth/`, {
      username: testLecturerUser.username,
      password: 'testLecturerUser',
    })
  ).data;

  globalThis.__STUDENT_TOKEN__ = (
    await axios.post(`http://localhost:3000/api/auth/`, {
      username: testStudentUser.username,
      password: 'testStudentUser',
    })
  ).data;
};
