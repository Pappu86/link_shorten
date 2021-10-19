import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import ShortenUrl from './models/shorten.model.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

let __dirname = path.resolve();
dotenv.config({ path: __dirname + '/.env' });

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Mongo DB database connection established successfully!');
});

// Routes
// Generate short url link
app.post('/generateShortenUrl', (req, res) => {
  const { url } = req.body;
  let randomId = makeid(6);
  let slug = randomId;
  const shortenData = new ShortenUrl({
    url,
    slug
  });

  shortenData.save((error) => {
    if (error) {
      res.send(error);
    } else {
      res.send({ slug: slug, message: "successfully added!" });
    }
  });

});

// Redirect origin url from short link
app.get('/redirectOriginUrl/:slug', (req, res) => {
  const { slug } = req.params;
  const existsUrlInfo = ShortenUrl.findOne({ slug: slug }, function (err, shorten) {
    if (shorten) {
      res.send({
        url: shorten.url,
        shortenUrl: process.env.URL + slug,
        message: "successfully added!"
      });
    } else {
      res.send(error);
    }
  });
});

// Get all short link Urls
app.get('/allShortenUrls', (req, res) => {
  const shortenUrls = ShortenUrl.find({}, function (err, docs) {
    if (err) {
      res.send(err);
    } else {
      res.send({ shortenUrls: docs, message: "get all shorten link" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
});


const makeid = (length) => {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}