const express = require("express");
const bodyParser = require("body-parser");
const knex = require("knex");
const pg = require("pg");
const http = require("http");
const cors = require("cors");
const path = require("path");
var uniqid = require("uniqid");
const cloudinary = require("cloudinary");
const axios = require("axios");

cloudinary.config({
  cloud_name: "wows",
  api_key: "785164241988465",
  api_secret: "Bnz02Q1rQ_lVEJ6DsBvclpP9avw",
});
// here we will verify our database is

// that is time to define database configuration
// this is local database for trial base
// const db = knex({
//   client: "pg",
//   connection: {
//     host: "127.0.0.1",
//     user: "postgres",
//     password: "yakraj",
//     database: "postgres",
//   },
// });

// create table mega_projects(id serial primary key,title text,description text,url text,date text,images text [],tags text, projectid text,post_type varchar(10))
const db = knex({
  client: "pg",
  connection: {
    host: "bppitvhyuob0u5nzoy8i-postgresql.services.clever-cloud.com",
    user: "u2gmxdylg4erjg8gxhmi",
    password: "Ne1k1OSpUMcjMT2RMtaWklACQOuErn",
    database: "bppitvhyuob0u5nzoy8i",
  },
});
//  now we have defined database connection
const app = express();
const server = http.Server(app);
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.resolve("./public")));
const port = 5001;
function ignoreFavicon(req, res, next) {
  if (req.originalUrl.includes("favicon.ico")) {
    res.status(204).end();
  }
  next();
}
app.use(ignoreFavicon);

app.get("/", (req, res) => {
  const clientIpAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  console.log(clientIpAddress);
  axios
    .get(`https://ipinfo.io/${clientIpAddress}?token=ca553a36187af5`)
    .then(function (response) {
      db("information")
        .insert({
          country: response.data.country,
          region: response.data.region,
          data: [response.data],
        })
        .then((ress) => {
          res.end();
        });
    });
});

app.post("/create/smallproject", (req, res) => {
  var { title, description, url, thumbnail } = req.body;
  var adid = uniqid(title);
  db("small_projects")
    .insert({
      title: title,
      description: description,
      url: url,
      date: new Date(),
      thumbnail: thumbnail,
      projectid: adid,
    })
    .then((response) => {
      res.json("successfully created");
    })
    .catch((err) => res.status(400).json("unable to create data"));
});
app.get("/favicon.ico", (req, res) => res.status(204));

app.get("/smallproject", (req, res) => {
  db("small_projects")
    .select("*")
    .then((response) => res.json(response));
});
app.get("/megaproject", (req, res) => {
  db("mega_projects")
    .select("*")
    .then((response) => res.json(response));
});
app.post("/create/megaproject", (req, res) => {
  var { title, description, url, tech, images, web_type } = req.body;
  var adid = uniqid(title);
  db("mega_projects")
    .insert({
      title: title,
      description: description,
      url: url,
      date: Date(),
      images: images,
      projectid: adid,
      tech_used: tech,
      web_type: web_type ? web_type : "design",
    })
    .then((response) => {
      res.json("successfully created");
    });
});
// i dont it is not chanting
server.listen(port, () => console.log("server is running on port " + port));
