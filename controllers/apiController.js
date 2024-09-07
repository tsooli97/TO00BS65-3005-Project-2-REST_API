const movie = require("../models/movie");
const Movie = require("../models/movie");
const { body, validationResult } = require("express-validator");

exports.getAll = async (req, res) => {
  try {
    const allMovies = await Movie.find().exec();
    console.log("All movies: ", allMovies);
    res.status(200).json({ message: allMovies });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getId = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).exec();
    console.log("Movie: ", movie);

    if (!movie) {
      return res
        .status(404)
        .json({ message: "No movie found with provided id" });
    }
    res.status(200).json(movie);
  } catch (err) {
    console.log("Error: ", err);
    next(err);
  }
};

exports.postAdd = [
  body("name")
    .exists()
    .withMessage("Name is required")
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Movie name must be between 1 and 50 characters"),
  body("year")
    .exists()
    .withMessage("Year is required")
    .isInt({ min: 1800, max: 2030 })
    .withMessage("Year must be an integer, min: 1800, max: 2030"),
  body("bio")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Bio max length is 500 characters"),
  body("director")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Director name must be between 3 and 100 characters")
    .isAlpha("fi-FI", { ignore: " " })
    .withMessage("All of the characters must be letters of the alphabet only"),
  body("starring")
    .optional()
    .isArray()
    .withMessage("Starring must be an array"),
  body("starring.*.actor")
    .isString()
    .withMessage("Actor names must be strings"),
  body("starring.*.role").isString().withMessage("Roles must be strings"),
  body("genre").optional().isArray().withMessage("Genre must be an array"),
  body("genre.*").isString().withMessage("Each genre must be a string"),

  async (req, res) => {
    console.log("Body: ", req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const movie = new Movie({
        name: req.body.name,
        year: req.body.year,
        bio: req.body.bio,
        starring: req.body.starring,
        genre: req.body.genre,
      });
      await movie.save();
      return res.status(201).json({ message: "Succesfully created movie" });
    } catch (err) {
      console.log("Error: ", err);
      res.status(500).json({
        message: `Error in adding movie`,
      });
    }
  },
];

exports.patchId = [
  body("name")
    .optional()
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage("Movie name must be between 1 and 50 characters"),
  body("year")
    .optional()
    .isInt({ min: 1800, max: 2030 })
    .withMessage("Year must be an integer, min: 1800, max: 2030"),
  body("bio")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Bio max length is 500 characters"),
  body("director")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Director name must be between 3 and 100 characters")
    .isAlpha("fi-FI", { ignore: " " })
    .withMessage("All of the characters must be letters of the alphabet only"),
  body("starring")
    .optional()
    .isArray()
    .withMessage("Starring must be an array"),
  body("starring.*.actor")
    .isString()
    .withMessage("Actor names must be strings"),
  body("starring.*.role").isString().withMessage("Roles must be strings"),
  body("genre").optional().isArray().withMessage("Genre must be an array"),
  body("genre.*").isString().withMessage("Each genre must be a string"),

  async (req, res, next) => {
    console.log("Params ID: ", req.params.id);
    console.log("Body: ", req.body);

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Request body is empty" });
    }

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const response = await movie.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        year: req.body.year,
        bio: req.body.bio,
        starring: req.body.starring,
        genre: req.body.genre,
      });

      if (!response) {
        return res
          .status(404)
          .json({ message: `Update failed: no movie found with provided id` });
      }
      res.json({
        message: `Movie by id: ${req.params.id} successfully updated`,
      });
    } catch (err) {
      console.log("Error: ", err);
      next(err);
    }
  },
];

exports.deleteId = async (req, res, next) => {
  console.log("Params ID: ", req.params.id);

  try {
    const response = await movie.findByIdAndDelete(req.params.id);
    console.log(response);
    if (!response) {
      return res
        .status(404)
        .json({ message: `Deletion failed: no movie found with provided id` });
    }
    res
      .status(200)
      .json({ message: `Movie by id: ${req.params.id} successfully deleted` });
  } catch (err) {
    console.log("Error: ", err);
    next(err);
  }
};
