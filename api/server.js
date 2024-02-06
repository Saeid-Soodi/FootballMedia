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

// url is like localhost:8080/M00872834/user
const userRouter = require('./routes/user');
app.use('/M00872834/user', userRouter);

// url is like localhost:8080/M00872834/user/auth
const authRouter = require('./routes/auth');
app.use('/M00872834/auth', authRouter);

// url is like localhost:8080/M00872834/signOut
const signOutRouter = require('./routes/signOut');
app.use('/M00872834/signOut', signOutRouter);

// url is like localhost:8080/M00872834/follow
const followRouter = require('./routes/follow');
app.use('/M00872834/follow', followRouter);

// url is like localhost:8080/M00872834/follow
const unFollowRouter = require('./routes/unFollow');
app.use('/M00872834/unFollow', unFollowRouter);

// url is like localhost:8080/M00872834/followerList
const followerListRouter = require('./routes/followerList');
app.use('/M00872834/followerList', followerListRouter);

// url is like localhost:8080/M00872834/followingList
const followingListRouter = require('./routes/followingList');
app.use('/M00872834/followingList', followingListRouter);

// url is like localhost:8080/M00872834/tweet
const tweetRouter = require('./routes/tweet');
app.use('/M00872834/tweet', tweetRouter);

// url is like localhost:8080/M00872834/comment
const commentRouter = require('./routes/comment');
app.use('/M00872834/comment', commentRouter);

// url is like localhost:8080/M00872834/team
const teamRouter = require('./routes/team');
app.use('/M00872834/team', teamRouter);

const PORT = 8080;
// server port
app.listen(PORT, () => {
  console.log(`BackEnd Server is running on port ${PORT}`);
});
