const Customer = require("../models/Customer");

// CREATE
exports.addCustomer = async (req, res) => {
  const customer = await Customer.create(req.body);
  res.json(customer);
};

// READ
exports.getCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
};

// UPDATE
exports.updateCustomer = async (req, res) => {
  const updated = await Customer.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

// DELETE
exports.deleteCustomer = async (req, res) => {
  await Customer.findByIdAndDelete(req.params.id);
  res.json({ message: "Customer Deleted" });
};
