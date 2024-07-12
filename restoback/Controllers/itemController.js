const Item = require("../Models/itemModel");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single("image");

// exports.getItemsByCategory = (req, res) => {
//   const { categoryId } = req.params;
//   Item.getByCategory(categoryId, (err, results) => {
//     if (err) {
//       console.error("Error fetching items by category:", err);
//       return res.status(500).send({ message: "Internal server error" });
//     }
//     res.send(results);
//   });
// };
// exports.searchItems = (req, res) => {
//   const { name } = req.query;
//   Item.searchByName(name, (err, results) => {
//     if (err) {
//       console.error("Error searching items:", err);
//       return res.status(500).send({ message: "Internal server error" });
//     }
//     res.send(results);
//   });
// };

exports.createItem = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const { name, price, category_id } = req.body;
    const image = req.file ? req.file.filename : "";

    Item.create(name, image, price, category_id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const newItem = {
        id: result.insertId,
        name,
        image,
        price,
        category_id,
        category_type: result.category_type, // Adjust based on actual response structure
      };
      res.status(201).send(newItem);
    });
  });
};

exports.getAllItems = (req, res) => {
  const { available, search, category, page = 1, limit = 5 } = req.query;

  const filter = {
    available: available !== undefined ? available === "true" : undefined,
    search: search || undefined,
    category: category || undefined,
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
  };

  Item.getAll(filter, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    Item.getCount(filter, (err, count) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).send({ items: results, count });
    });
  });
};

exports.deleteItem = (req, res) => {
  const { id } = req.params;
  Item.delete(id, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send({ message: "Item deleted successfully" });
  });
};

exports.updateItem = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const { id } = req.params;
    const { name, price, category_id } = req.body;
    const image = req.file ? req.file.filename : req.body.image;

    Item.update(id, name, image, price, category_id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).send({ message: "Item updated successfully" });
    });
  });
};

exports.updateAvailability = (req, res) => {
  const { id } = req.params;
  const { available } = req.body;

  Item.updateAvailability(id, available, (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).send({ message: "Item availability updated successfully" });
  });
};
