require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// creating variable for configure server
const app = express();

app.use(
  cors({
    origin: 'http://127.0.0.1:8081', // Update with your frontend origin
    credentials: true,
  })
);

// **Add CORS middleware here**
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
// if we have problem with db
db.on('error', (error) => console.error(error));
// after connecting to db, execute once
db.once('open', () => console.log('connected to DB'));

// telling server to use json for body req
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', true);
// import routes from other files
const userRouter = require('./routes/user');
app.use('/api/user', userRouter);
// url is like localhost:8080/api/user

const authRouter = require('./routes/auth');
app.use('/api/auth', authRouter);
// url is like localhost:8080/api/user/auth

const signOutRouter = require('./routes/signOut');
app.use('/api/signOut', signOutRouter);
// url is like localhost:8080/api/signOut

const PORT = 8080;
// server port
app.listen(PORT, () => {
  console.log(`BackEnd Server is running on port ${PORT}`);
});
