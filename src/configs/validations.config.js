const { check } = require("express-validator");

const register = [
  check("name").notEmpty().withMessage("Name is required."),
  check("username").notEmpty().withMessage("Username is required."),
  check("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6, max: 24 })
    .withMessage("Password must be more than 6 and less than 24 characters."),
  check("age").notEmpty().withMessage("Age is required."),
  check("avatar").notEmpty().withMessage("Avatar is required."),
];

const login = [
  check("username").notEmpty().withMessage("Username is required."),
  check("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6, max: 24 })
    .withMessage("Password must be more than 6 and less than 24 characters."),
];

const update_user = [
  check("name").notEmpty().withMessage("Name is required."),
  check("age").notEmpty().withMessage("Age is required."),
];

const store_movie = [
  check("title").notEmpty().withMessage("Title is required."),
  check("description").notEmpty().withMessage("Description is required."),
  check("release_date").notEmpty().withMessage("Release Date is required."),
  check("poster").notEmpty().withMessage("Poster is required."),
  check("rating").notEmpty().withMessage("Rating is required."),
  check("age_rating").notEmpty().withMessage("Age Rating is required."),
  check("price").notEmpty().withMessage("Price is required."),
];

const store_showtime = [
  check("movieId").notEmpty().withMessage("Movie ID is required."),
  check("date").notEmpty().withMessage("Date is required."),
  check("time").notEmpty().withMessage("Time is required."),
];

const store_transaction = [
  check("userId").notEmpty().withMessage("User ID is required."),
  check("movieId").notEmpty().withMessage("Movie ID is required."),
  check("showTimeId").notEmpty().withMessage("Showtime ID is required."),
  check("totalCost").notEmpty().withMessage("Total Cost is required."),
  check("bookingSeat")
    .notEmpty()
    .withMessage("Booking Seat is required.")
    .isArray()
    .withMessage("Booking Seat must be array."),
];

module.exports = {
  login,
  register,
  update_user,
  store_movie,
  store_showtime,
  store_transaction,
};
