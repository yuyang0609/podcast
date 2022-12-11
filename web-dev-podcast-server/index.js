// reference: https://www.bezkoder.com/react-node-express-mongodb-mern-stack/
import express from 'express';
import cors from 'cors';
import mongoose from "mongoose";
import session from 'express-session';
import userController from "./controller/user-controller.js";
import commentController from "./controller/comment-controller.js";
import creatorController from "./controller/creator-controller.js";
import podcastController from "./controller/podcast-controller.js";
import reviewController from "./controller/review-controller.js";
import dbConfig from "./config/db.config.js"
// import {dbConfig} from "./config/db.config.js";
const app = express();
app.set('trust proxy', 1);
let sess = {
  secret: 'secret',
  cookie: { }
};

if (app.get('env') === 'production') {
  app.set('trust proxy', 1)
  sess.cookie.secure = true;
}

app.use(session(sess));

app.use(cors({
  credentials: true,
  origin: 'http://localhost:3000',
  headers: ['Authorization', 'X-Requested-With', 'Content-Type']
}));

// app.use(session(sess));
// app.use(cors(corsOptions));
app.use(express.json());
mongoose.connect(dbConfig.local_url);
app.get('/', (req, res) =>
{res.send('Welcome to Full Stack Development!')})

// app.use(cors({
//   credentials: true,
//   origin: 'http://localhost:3000',
//   headers: ['Authorization', 'X-Requested-With', 'Content-Type']
// }));

userController(app);
commentController(app);
creatorController(app);
podcastController(app);
reviewController(app);

// set port, listen for requests
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Note: code for mongodb connection, may not be necessary but storing here in case
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://hollylovejoy:<password>@webdev-cluster.vug6c.mongodb.net/?retryWrites=true&w=majority";
//
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

