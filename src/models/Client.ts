import mongoose, { Schema, model, models } from 'mongoose';

const ClientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    designation: {
        type: String,
        required: [true, 'Designation is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    imageUrl: {
        type: String,
        required: [true, 'Image URL is required'],
    },
}, { timestamps: true });

const Client = models.Client || model('Client', ClientSchema);

export default Client;
