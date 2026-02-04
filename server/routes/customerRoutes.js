const express = require("express");
const auth = require("../middleware/authMiddleware");
const {
  addCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer
} = require("../controllers/customerController");

const router = express.Router();

router.post("/", auth, addCustomer);
router.get("/", auth, getCustomers);
router.put("/:id", auth, updateCustomer);
router.delete("/:id", auth, deleteCustomer);

module.exports = router;
