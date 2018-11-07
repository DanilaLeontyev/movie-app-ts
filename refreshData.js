const data = require('./data/json/movies-in-theaters.json');
const MongoClient = require('mongodb').MongoClient;

const MONGO_URL =
  'mongodb://admin:123456don@ds215633.mlab.com:15633/movie-database'; // Строка подключения к базе

MongoClient.connect(
  MONGO_URL,
  { useNewUrlParser: true },
  (err, client) => {
    let movies = client.db('movie-database').collection('movie-in-theaters');
    movies.insertMany(data);
  }
);
