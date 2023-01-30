const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: 60,
    },
    desc: {
      type: String,
      required: true,
      maxlength: 400,
    },
    img: {
      type: String,
      required: true,
    },
    priceItem: {
      type: Number,
      required: true,
      default: 0,
    },
    sellItem: {
      type: Number,
      default: 0,
    },
    cheapestPrice: {
      type: Number,
      default: 0,
    },
    typeOfOptions: {
      type: [
        {
          title: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.models.Item || mongoose.model('Item', ItemSchema);
