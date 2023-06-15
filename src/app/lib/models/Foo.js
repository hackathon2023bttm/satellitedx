const mongoose = require("mongoose")

const FooSchema = new mongoose.Schema({
  name: {
    type: 'string'
  },
})

module.exports = mongoose.models.foo || mongoose.model('foo', FooSchema);
