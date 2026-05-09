const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    company: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Customer', CustomerSchema);
