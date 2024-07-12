const Category = require('../Models/categoryModel');
const multer = require('multer');



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single('image');

exports.createCategory = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const { name, type } = req.body;
    const image = req.file ? req.file.filename : '';

    Category.create(name, image, type, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).send({ id: result.insertId, name, image, type });
    });
  });
};

exports.getAllCategories = (req, res) => {
  Category.getAll((err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send(results);
  });
};
