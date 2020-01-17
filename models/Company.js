const mongoose = require('mongoose');
const {Schema} = mongoose;

const companySchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true},
  employees: [{ type: Schema.Types.ObjectId, ref: 'Employee'}],
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;