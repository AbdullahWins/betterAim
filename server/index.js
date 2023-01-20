const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const port = process.env.port || 5000;
const { MongoClient, ObjectId, ServerApiVersion } = require("mongodb");
require("dotenv").config();

app.use(cors());
app.use(express.json());

const dbUserName = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const tokenSecret = process.env.TOKEN_SECRET;

const uri = `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.zg8vlyt.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

function verifyJWT(req, res, next) {
  const jwtToken = req.headers.jwttoken;
  if (!jwtToken) {
    res.status(401).send({ message: "You need a Token." });
  }
  jwt.verify(jwtToken, tokenSecret, function (error, decoded) {
    if (error) {
      res.status(403).send({ message: "Invalid Token" });
    }
    req.decoded = decoded;
    next();
  });
}

async function run() {
  try {
    const serviceCollection = client.db("betterAim").collection("services");
    const reviewCollection = client.db("betterAim").collection("reviews");

    app.post("/jwt", (req, res) => {
      const email = req.body;
      const token = jwt.sign(email, tokenSecret, {
        expiresIn: "7d",
      });
      res.send({ token });
    });

    app.get("/services", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get("/servicesFromHome", async (req, res) => {
      const count = parseInt(req.query.count);
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.limit(count).toArray();
      console.log(services);
      res.send(services);
    });

    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);
    });
    app.post("/services", async (req, res) => {
      const service = req.body;
      const result = await serviceCollection.insertOne(service);
      res.send(result);
    });

    // reviews here

    app.get("/reviews", async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    });
    app.get("/reviewsFromDetails", async (req, res) => {
      const reviewId = req.query.id;
      console.log(reviewId);
      const query = { reviewServiceId: reviewId };
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews);
    });

    app.get("/reviewsFromHome", async (req, res) => {
      const query = {};
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      res.send(reviews.reverse());
    });

    app.get("/myReviews", verifyJWT, async (req, res) => {
      const email = req.query.email;
      const jwtToken = req.headers.jwttoken;
      const query = { reviewEmail: email };
      const cursor = reviewCollection.find(query);
      const reviews = await cursor.toArray();
      console.log(jwtToken);
      res.send(reviews);
    });

    app.get("/myReviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const cursor = reviewCollection.find(query);
      const review = await cursor.toArray();
      res.send(review);
    });

    app.patch("/myReviews/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: ObjectId(id) };
      const review = req.body;
      console.log(review[0]);
      const updatedReview = {
        $set: {
          reviewBody: review[0].reviewBody,
          reviewServiceRating: review[0].reviewServiceRating,
        },
      };
      const result = await reviewCollection.updateOne(query, updatedReview);
      res.send(result);
    });

    app.delete("/myReviews/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await reviewCollection.deleteOne(query);
      res.send(result);
    });

    app.post("/addreview", async (req, res) => {
      const reviews = req.body;
      const result = await reviewCollection.insertOne(reviews);
      res.send(result);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Better Aim Server Running");
});

const blogs = require("./data/blogs.json");

app.get("/blogs", (req, res) => {
  res.send(blogs);
});

app.listen(port, () => {
  console.log("server running");
});
