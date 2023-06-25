// Route
const index_route = require("./src/routes/api/index.route");
const authentication_route = require("./src/routes/api/authentication.route");
const transaction_route = require("./src/routes/api/transaction.route");
const user_route = require("./src/routes/api/user.route");
// Admin
const admin_user_route = require("./src/routes/api/admin/user.route");
const admin_movie_route = require("./src/routes/api/admin/movie.route");
const admin_showtime_route = require("./src/routes/api/admin/showtime.route");

const cors_option = require("./src/configs/cors.config");
const sync_database = require("./src/databases/sync.database");
const factory = require("./src/databases/factory.database");

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${process.cwd()}/storage`));
app.use(cors(cors_option));
app.set("trust proxy", true);

sync_database();
// factory();

app.use(index_route);
app.use(authentication_route);
app.use(transaction_route);
app.use(user_route);
app.use(admin_user_route);
app.use(admin_movie_route);
app.use(admin_showtime_route);

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}.`);
});
