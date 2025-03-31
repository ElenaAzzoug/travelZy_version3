const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    voyage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Voyage",
      required: true
    },
    paymentMethodType: {
      type: String,
      enum: ["credit_card", "paypal"],
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      required: true,
    },
    dateRéservation: {
      type: Date,
      default: Date.now,
    },
    adults: {
      type: Number,
      required: true,
    },
    jeunes: {
      type: Number,
      required: true,
    },
    nourrissons: {
      type: Number,
      required: true,
    },
    prixTotal: {
      type: Number,
      required: true
    }
    
  
     } ,{ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);


reservationSchema.virtual("nombrePersonneTotale").get(function () {
    return this.adults + this.jeunes + this.nourrissons;
  });
  

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
