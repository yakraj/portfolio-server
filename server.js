const express = require("express");
const bodyParser = require("body-parser");
const knex = require("knex");
const pg = require("pg");
const http = require("http");
const cors = require("cors");
const path = require("path");
var uniqid = require("uniqid");
// const upload = require("./multerUpload");
const cloudinary = require("cloudinary");
const multer = require("multer");
const { response } = require("express");
const axios = require("axios");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ dest: "uploads/" });

// const  = require("./multerUpload");
cloudinary.config({
  cloud_name: "wows",
  api_key: "785164241988465",
  api_secret: "Bnz02Q1rQ_lVEJ6DsBvclpP9avw",
});
// here we will verify our database is

// that is time to define server configuration

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "yakraj",
    database: "postgres",
  },
});
// hello there
// create table mega_projects(id serial primary key,title text,description text,url text,date text,images text [],tags text, projectid text,post_type varchar(10))
// const db = knex({
//   client: "pg",
//   connection: {
//     host: "bppitvhyuob0u5nzoy8i-postgresql.services.clever-cloud.com",
//     user: "u2gmxdylg4erjg8gxhmi",
//     password: "Ne1k1OSpUMcjMT2RMtaWklACQOuErn",
//     database: "bppitvhyuob0u5nzoy8i",
//   },
// });
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

// from here i am using code from clever cloud documentation

// until here i am using code from clever cloud

// here we can make requests

app.get("/", (req, res) => {
  var data = [];
  // axios
  //   .get("https://www.ipinfo.io/106.216.254.229?token=ca553a36187af5")
  //   .then(function (response) {
  //     res.json([response.data]);
  //   });

  res.json("hi there");
  // console.log(data);
  // fetch("https://quotes.toscrape.com/random")
  //   .then((response) => response.text())
  //   .then((body) => {
  //     res.json(body);
  //   });
});

app.post("/create/smallproject", (req, res) => {
  var { title, desc, url, thumbnail, format, post_type } = req.body;
  var adid = uniqid(title, new Date());
  db("small_projects")
    .insert({
      title: title,
      description: desc,
      url: url,
      date: new Date(),
      thumbnail: thumbnail,
      projectid: adid,
      thumb_format: format,
      post_type: post_type,
    })
    .then((response) => {
      res.json("successfully created");
    })
    .catch((err) => res.status(400).json("unable to create data"));
});
app.get("/favicon.ico", (req, res) => res.status(204));

app.get("/smallproject", (req, res) => {
  console.log(req);
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
  var { title, desc, url, format, tags, images, post_type } = req.body;

  var adid = uniqid(title);
  console.log(adid);
  db("mega_projects")
    .insert({
      title: title,
      description: desc,
      url: url,
      date: Date(),
      images: images,
      projectid: adid,
      tags: tags,
      post_type: post_type,
    })
    .then((response) => {
      res.json("successfully created");
    });
});

server.listen(port, () => console.log("server is running on port " + port));
