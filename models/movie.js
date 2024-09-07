const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  name: { type: String, required: true, minLength: 1, maxLength: 50 },
  year: { type: Number, required: true, min: 1800, max: 2030 },
  bio: { type: String, maxLength: 500 },
  director: { type: String, maxLength: 100 },
  starring: [
    {
      actor: { type: String, required: true },
      role: { type: String, required: true },
    },
  ],
  genre: [{ type: String }],
});

module.exports = mongoose.model("Movie", MovieSchema, "myMovies");
