
const mongoose = require('mongoose')

const cartsSchema = new mongoose.Schema([
  {
    priceTotal: {
      type: Number,
      default: 0,
    },
    quantityTotal: {
      type: Number,
      default: 0,
    },
    products: [{
      _id: false,
      id: String,
      title: String,
      description: String,
      qanttity: {
        type: Number,
        default: 1,
      }
    }
    ]
  }
]
)

const cartsModel = mongoose.model('carts', cartsSchema);

module.exports = cartsModel;