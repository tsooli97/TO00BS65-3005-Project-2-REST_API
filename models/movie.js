const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const genreArrayLimit = (val) => {
  return val.length <= 5;
};

const starringArrayLimit = (val) => {
  return val.length <= 10;
};

const MovieSchema = new Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 100 },
  year: { type: Number, required: true, min: 1800, max: 2030 },
  bio: { type: String, maxLength: 500 },
  director: { type: String, maxLength: 100 },
  starring: {
    type: [
      {
        actor: { type: String, minLength: 2, maxLength: 100, required: true },
        role: { type: String, minLength: 1, maxLength: 100, required: true },
      },
    ],
    validate: {
      validator: starringArrayLimit,
      message: "{PATH} exceeds the limit of 10",
    },
  },
  genres: {
    type: [{ type: String, minLength: 2, maxLength: 100 }],
    validate: {
      validator: genreArrayLimit,
      message: "{PATH} exceeds the limit of 5",
    },
  },
});

module.exports = mongoose.model("Movie", MovieSchema, "myMovies");
