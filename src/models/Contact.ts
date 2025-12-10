import mongoose, { Schema, model, models } from 'mongoose';

const ContactSchema = new Schema({
    fullName: {
        type: String,
        required: [true, 'Full Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    mobile: {
        type: String,
        required: [true, 'Mobile number is required'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
    },
}, { timestamps: true });

const Contact = models.Contact || model('Contact', ContactSchema);

export default Contact;
