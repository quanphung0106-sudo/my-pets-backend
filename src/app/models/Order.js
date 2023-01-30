const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: {
      type: String,
    },
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
      type: String,
      required: true,
      maxlength: 60,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required: true,
    },
    products: {
      type: [
        {
          _id: {
            type: String,
          },
          check: {
            type: {
              title: {
                type: String,
              },
              price: {
                type: Number,
              },
            },
          },
          title: {
            type: String,
          },
          total: {
            type: Number,
          },
          quantity: {
            type: Number,
          },
          img: {
            type: String,
          },
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Order || mongoose.model("Order", OrderSchema);
