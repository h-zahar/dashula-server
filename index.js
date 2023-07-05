const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const routes = require("./routes/kpis");
const KPI = require("./models/kpi");
const { kpis } = require("./data/data");

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use("/api", routes);

mongoose
  .connect(
    process.env.DB_URL.replace("<user>", process.env.DB_USERNAME)
      .replace("<pass>", process.env.DB_PASSWORD)
      .replace("<db>", process.env.DB_NAME),
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(async () => {
    app.listen(port, () => {
      console.log(`Server running happily on port: ${port}`);
    });

    /* INSERTING SEED DATA (ONE TIME ONLY) */
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis).then(() => console.log("Data inserted!"));
  })
  .catch((err) => console.log(err));
