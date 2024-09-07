const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  name: { type: String, required: true, minLength: 2, maxLength: 100 },
  year: { type: Number, required: true, min: 1800, max: 2030 },
  bio: { type: String, maxLength: 500 },
  director: { type: String, minLength: 2, maxLength: 100 },
  starring: [
    {
      actor: { type: String, minLength: 2, maxLength: 100, required: true },
      role: { type: String, minLength: 1, maxLength: 100, required: true },
    },
  ],
  genre: [{ type: String, minLength: 2, maxLength: 100 }],
});

module.exports = mongoose.model("Movie", MovieSchema, "myMovies");
