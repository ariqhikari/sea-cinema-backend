const movie_model = require("../models/movie.model");
const showtime_model = require("../models/showtime.model");
const {
  generateSeats,
} = require("../../controllers/admin/showtime.controller");

const { v1 } = require("uuid");

const init = async () => {
  const showtimes = await showtime_model.findAll();
  const movies = await movie_model.findAll();
  if (movies.length === 0) {
    console.log(
      "No movies available. Seeder data for showtimes cannot be created."
    );
    return;
  }

  const showtimeDates = [];
  const endDate = new Date(2023, 6, 20);
  for (
    let d = new Date(2023, 6, 14);
    d <= endDate;
    d.setDate(d.getDate() + 1)
  ) {
    showtimeDates.push(new Date(d));
  }

  const data = [];

  showtimeDates.forEach((date) => {
    movies.forEach((movie) => {
      data.push(
        {
          id: `SHW-${v1()}`,
          movieId: movie.id,
          date: date.toISOString().split("T")[0],
          time: "08:00",
          seats: generateSeats(),
        },
        {
          id: `SHW-${v1()}`,
          movieId: movie.id,
          date: date.toISOString().split("T")[0],
          time: "10:00",
          seats: generateSeats(),
        },
        {
          id: `SHW-${v1()}`,
          movieId: movie.id,
          date: date.toISOString().split("T")[0],
          time: "12:00",
          seats: generateSeats(),
        },
        {
          id: `SHW-${v1()}`,
          movieId: movie.id,
          date: date.toISOString().split("T")[0],
          time: "14:00",
          seats: generateSeats(),
        }
      );
    });
  });

  const promises = [];

  if (!showtimes.length) {
    data.forEach((item) => {
      promises.push(
        new Promise(async (resolve, reject) => {
          try {
            await showtime_model.create(item);

            resolve(true);
          } catch (error) {
            reject(false);
          }
        })
      );
    });

    Promise.all(promises)
      .then(() => console.log("Success generate showtimes."))
      .catch(() => console.log("Failed generate showtimes."));
  } else {
    console.log("Showtimes already generated.");
  }
};

module.exports = init;
