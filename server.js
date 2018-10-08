const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const mime = require('mime');
const app = express();
const port = process.env.PORT || 5000;
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const multer = require('multer');

const MONGO_URL =
  'mongodb://admin:123456don@ds215633.mlab.com:15633/movie-database'; // Строка подключения к базе

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/img', express.static(__dirname + '/data/img/'));

// Запрос на получение всех фильмов из базы
app.get('/api/movies', (req, res) => {
  MongoClient.connect(
    MONGO_URL,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) console.log(err);
      let movies = client.db('movie-database').collection('movie-in-theaters');

      movies.find().toArray((err, result) => {
        if (err) console.log(err);
        res.send(result);
      });
    }
  );
});

// Запрос на добавление нового фильма
app.post('/api/movies', (req, res) => {
  MongoClient.connect(
    MONGO_URL,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) console.log(err);
      let data = req.body.movie;
      let movies = client.db('movie-database').collection('movie-in-theaters');

      movies.insertOne(data);
    }
  );
});

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './data/img/');
  },
  filename: function(req, file, cb) {
    crypto.pseudoRandomBytes(16, function(err, raw) {
      cb(
        null,
        raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype)
      );
    });
  }
});

const upload = multer({ storage: storage });

app.post('/upload', upload.single('poster'), (req, res) => {
  res.send(req.file.filename);
});

// Запрос на изменение данных о фильме
app.put('/api/movies', (req, res) => {
  MongoClient.connect(
    MONGO_URL,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) console.log(err);
      let oldData = req.body.oldData;
      let newData = req.body.newData;
      let id = new ObjectId(oldData._id);
      let movies = client.db('movie-database').collection('movie-in-theaters');

      movies.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            title: newData.title ? newData.title : oldData.title,
            genres: newData.genres.length > 0 ? newData.genres : oldData.genres,
            duration: newData.duration ? newData.duration : oldData.duration,
            releaseDate: newData.releaseDate
              ? newData.releaseDate
              : oldData.releaseDate,
            year: newData.year ? newData.year : oldData.year
          }
        },
        {
          new: false,
          upsert: true
        },
        (err, result) => {
          if (err) return res.send(err);
          res.send(result);
        }
      );
    }
  );
});

// Запрос на удаление фильма
app.delete('/api/movies', (req, res) => {
  MongoClient.connect(
    MONGO_URL,
    { useNewUrlParser: true },
    (err, client) => {
      if (err) console.log(err);
      let id = new ObjectId(req.body.movie._id); // Получаем ID элемента,который нужно удалить
      let movies = client.db('movie-database').collection('movie-in-theaters');

      movies.findOneAndDelete(
        {
          _id: id
        },
        (err, result) => {
          if (err) res.send(500, err);
          res.send({ message: 'success delete' });
        }
      );
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
