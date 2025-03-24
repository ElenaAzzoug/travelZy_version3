const mongoose = require("mongoose");

const voyageSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    codePromo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PromoCode",
    },
    subTitle: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    prix: {
        type: Number,
        required: true,
    },
    dateDepart: {
        type: Date,
        default: Date.now,
    },
    placesDisponible: {
        type: Number,
        required: true,
    },
    imagePrincipale: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
    }],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Please provide a category Id"],
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subCategory",
        required: [true, "Please provide a subCategory Id"],
    },
    activities: [{
        type: String,
    }],
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});



const Voyage = mongoose.model("Voyage", voyageSchema);

module.exports = Voyage;