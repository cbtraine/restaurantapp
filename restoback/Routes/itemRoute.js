const express = require("express");
const router = express.Router();
const itemController = require("../Controllers/itemController");

router.post("/", itemController.createItem);
router.get("/", itemController.getAllItems);
router.delete("/:id", itemController.deleteItem);
router.put("/:id", itemController.updateItem);
router.patch("/:id/availability", itemController.updateAvailability);

//router.get("/category/:categoryId", itemController.getItemsByCategory);

// Search items by name
//router.get('/search', itemController.searchItems);

module.exports = router;
