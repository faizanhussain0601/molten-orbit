import mongoose, { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
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

const Project = models.Project || model('Project', ProjectSchema);

export default Project;
