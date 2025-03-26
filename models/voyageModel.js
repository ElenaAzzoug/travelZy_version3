const mongoose = require('mongoose');

const voyageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name for this voyage']
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Référence au modèle CategoryModel
        required: true
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price']
    },
    description: String
}, {
    timestamps: true
});

const VoyageModel = mongoose.model('Voyage', voyageSchema);

module.exports = VoyageModel;
