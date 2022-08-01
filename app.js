const express = require("express");
const mysql = require("mysql");
const port = 3009;

const connection = mysql.createConnection({
  host: "localhost",
  user: "admin5",
  password: "password",
  database: "webflix",
  port: 3309,
});

connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to database");
});

const app = express();

app.get("/get-actors", (req, res) => {
  let sql = "SELECT * FROM actors";
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.post("/insert-actor", (req, res) => {
  let actorName = req.body.actorName;
  let sql = `INSERT INTO actors VALUES (NULL, '${actorName}')`;
  console.log(sql);
  let query = connection.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send("Actor created");
  });
});

app.post("/edit-actor", (req, res) => {
  let id = req.body.id;
  let payload = req.body.actorName;
  let sql = `UPDATE actors SET nom_acteur = '${payload}' WHERE id_acteur = ${id}`;
  let query = connection.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    if (results.affectedRows > 0) {
      res.send("Actor id: " + id + ", " + payload + " updated");
    } else {
      res.send("Actor " + payload + " not found");
    }
  });
});

app.delete("/delete-actor", (req, res) => {
  let id = req.body.id;
  let sql = `DELETE FROM actors WHERE id_acteur = ${id}`;
  let query = connection.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    if (results.affectedRows > 0) {
      res.send("actor id: " + id + " deleted");
    }
  });
});

app.get("/get-movies", (req, res) => {
  let sql = "SELECT * FROM movies";
  let query = connection.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/insert-movies", (req, res) => {
  let movieName = req.body.movieName;
  let published = req.body.published;
  let synopsis = req.body.synopsis;
  let duration = req.body.duration;
  let photo = req.body.photo;
  let idCategory = req.body.idCategory;

  let sql = `INSERT INTO movies VALUES (NULL, '${movieName}' ,'${published}','${synopsis}',${duration},'${photo}', ${idCategory})`;
  console.log(sql);
  let query = connection.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send("Movie created");
  });
});

app.put("/edit-movie", (req, res) => {
  let id = req.body.id;
  let movieName = req.body.movieName;
  let published = req.body.published;
  let synopsis = req.body.synopsis;
  let duration = req.body.duration;
  let photo = req.body.photo;
  let idCategory = req.body.idCategory;
  let sql = `UPDATE movies SET nom_movies = '${movieName}', date_parution_movies = '${published}', synopsys_movies  = '${synopsis}', duration_movies  = ${duration}, photos_movies = '${photo}', id_category=${idCategory} WHERE id_movies  = ${id}`;

  let query = connection.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    if (results.affectedRows > 0) {
      res.send("Movie id: " + id + ", " + id + " updated");
    } else {
      res.send("Movie " + id + " not found");
    }
  });
});
app.delete("/delete-movie", (req, res) => {
  let id = req.body.id;
  let sql = `DELETE FROM movies WHERE id_movies = ${id}`;
  let query = connection.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    if (results.affectedRows > 0) {
      res.send("movies id: " + id + " deleted");
    }
  });
});
app.post("/insert-category", (req, res) => {
  let categoryName = req.body.categoryName;

  let sql = `INSERT INTO category VALUES (NULL, '${categoryName}' )`;
  console.log(sql);
  let query = connection.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send("category created");
  });
});

app.put("/edit-category", (req, res) => {
  let id = req.body.id;
  let categoryName = req.body.categoryName;

  let sql = `UPDATE category SET name_category= '${categoryName}'WHERE id_category = ${id}`;

  let query = connection.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    if (results.affectedRows > 0) {
      res.send("category id: " + id + ", " + id + " updated");
    } else {
      res.send("category " + id + " not found");
    }
  });
});
app.delete("/delete-category", (req, res) => {
  let id = req.body.id;
  let sql = `DELETE FROM movies WHERE id_category = ${id}`;

  let query = connection.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    if (results.affectedRows > 0) {
      let sql = `DELETE FROM category WHERE id_category = ${id}`;
      let query = connection.query(sql, (err, results) => {
        if (err) {
          throw err;
        }
        res.send("category id: " + id + " deleted");
      });
    }
    res.send("category id: " + id + " deleted");
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
